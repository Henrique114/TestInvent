sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment", 
    "../service/ServicoValidador",
    "../formatter/formatter"
],(Controller, JSONModel, Fragment, ServicoValidador, formatter) => {
    "use strict";

    const ENDPOINT_BASE = "/EquipamentoEletronico";
    const ROTA_LISTAGEM = "ListagemEquipamentos";
    const MODELO_EQUIPAMENTOS = "equipamentos";
    const MODELO_TRADUCAO = "i18n";
    const ID_TELA_DETALHES = "idDialogDetalhes";
    const ID_TELA_NOVO_EQUIPAMENTO = "idCadastroEAlterar";
    const NOME_FRAGMENT_DETALHES = "ui5.testinvent.view.DetalhesEquipamento";
    const NOME_FRAGMENT_NOVO_EQUIPAMENTO = "ui5.testinvent.view.AdicionarEditarEquipamento";
    const ITEM_SELECIONADO_LISTA = "modeloDialogo";
    const NOVO_EQUIPAMENTO = "modeloEquipamento";
    const MODELO_TIPO_EQUIPAMENTO = "modeloTipoEquipamento"; 

    return Controller.extend("ui5.testinvent.controller.ListagemEquipamentos", {
        onInit: function () {
            this._oResourceBundle = this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();
            const rota = this.getOwnerComponent().getRouter();
            rota.getRoute(ROTA_LISTAGEM).attachPatternMatched(this._aoAcessarListar, this);
        },

        _aoAcessarListar: function () {
            this._obterDadosEquipamentos();
        },

        _obterDadosEquipamentos: function (nome = "") {
            let urlRequisicaoEquipamentos = `${ENDPOINT_BASE}${nome ? "?filtro=" + encodeURIComponent(nome) : ""}`;
            this._carregarTiposEquipamento();

            fetch(urlRequisicaoEquipamentos)
                .then(response => response.json())
                .then(equipamentos => {
                    const dadosTipo = this.getView().getModel(MODELO_TIPO_EQUIPAMENTO).getData();

                    equipamentos.forEach(element => {
                        element.dataDeInclusao = new Date(element.dataDeInclusao);
                        element.descricaoDoTipo = formatter.obterDescricaoDoEnum(element.tipo, dadosTipo); 
                    });

                    const model = new JSONModel(equipamentos);
                    this.getView().setModel(model, MODELO_EQUIPAMENTOS);
            })
        },

        aoFiltrarEquipamentos: function (evento){
            const _query = evento.getParameter("query");
            this._obterDadosEquipamentos(_query);
        },
        
        aoIrParaDetalhes: function (evento) {   

            const equipamentoSelecionado = evento
                .getSource()
                .getBindingContext(MODELO_EQUIPAMENTOS)
                .getObject();

            this.getView().setModel(new JSONModel(equipamentoSelecionado), ITEM_SELECIONADO_LISTA);
            this._AbrirTelaDeDetalhes();
        },

        _AbrirTelaDeDetalhes: function() {
           var view = this.getView();
           var dialogDetalhes = this.byId(ID_TELA_DETALHES);

            if (!dialogDetalhes) {
               return this._criarTelaDeDetalhes(view)
                    .then((dialogDetalhesp) => dialogDetalhesp.open());
            }else{            
                dialogDetalhes.open();
            }
        },

        _criarTelaDeDetalhes: function(view) {
            return Fragment.load({
                id: view.getId(),
                name: NOME_FRAGMENT_DETALHES,
                controller: this
            }).then((dialogDetalhes) => {
                dialogDetalhes.setModel(); 
                this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();   
                view.addDependent(dialogDetalhes);
                this.dialogDetalhes = dialogDetalhes;
                return dialogDetalhes;
            });
        },
        
        aoPressionarFecharDetalhes: function() {
            this.dialogDetalhes.close();
        },

        aoIrParaAdicionarEEditarEquipamento: function(evento) { 

            if (this.dialogDetalhes && this.dialogDetalhes.isOpen()) {
                this.dialogDetalhes.close();
            }
            debugger
            console.log("Evento: ", evento);
            let idEquipamento;
            if ( evento.getSource().getBindingContext()) {
                idEquipamento = evento.getSource()
                    .getBindingContext(MODELO_EQUIPAMENTOS)
                    .getObject().id;
            }

            const modeloDialogo = this.getView().getModel(ITEM_SELECIONADO_LISTA);
            if (modeloDialogo) {
                idEquipamento = modeloDialogo.getData().id;
            }
            
            
            this._AbrirTelaAdicionarEEditarEquipamento(idEquipamento); 
        },

        _AbrirTelaAdicionarEEditarEquipamento: function(idEquipamento) {
           var view = this.getView();
           var dialogAdicionarEditar = this.byId(ID_TELA_NOVO_EQUIPAMENTO);

            if (!dialogAdicionarEditar) {
                 this._criarTelaAdicionarEEditarEquipamento(view)
                    .then((dialogAdicionarEditarp) => dialogAdicionarEditarp.open());
            } else{
                dialogAdicionarEditar.setModel(new JSONModel({}), NOVO_EQUIPAMENTO);
                dialogAdicionarEditar.open();
            }

            if (idEquipamento) {
                this._carregarEquipamentoParaEdicao(idEquipamento);
            }
        },

        _criarTelaAdicionarEEditarEquipamento: function(view) {
            return Fragment.load({
                id: view.getId(),
                name: NOME_FRAGMENT_NOVO_EQUIPAMENTO,
                controller: this
            }).then((dialogAdicionarEditar) => {
                dialogAdicionarEditar.setModel(new JSONModel({}), NOVO_EQUIPAMENTO);
                this._carregarTiposEquipamento();
                dialogAdicionarEditar.setModel(this.getView().getModel(MODELO_TIPO_EQUIPAMENTO)); 
                this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();   
                view.addDependent(dialogAdicionarEditar);
                this.dialogAdicionarEditar = dialogAdicionarEditar;
                return dialogAdicionarEditar;
            });
        },

        _carregarEquipamentoParaEdicao: function(idEquipamento) {
            const url = `${ENDPOINT_BASE}/${idEquipamento}`;
            fetch(url)
                .then(response => response.json())
                .then(dados => {
                    const modelo = this.byId(ID_TELA_NOVO_EQUIPAMENTO).getModel(NOVO_EQUIPAMENTO);
                    modelo.setData(dados);
                    modelo.refresh(true);
                });

        },

        aoPressionarSalvar: function() {
            const dados = this.dialogAdicionarEditar.getModel(NOVO_EQUIPAMENTO).getData();
            
            if (!ServicoValidador.validarFormulario.call(this)) {
                return;
            }
            
            dados.tipo = parseInt(dados.tipo),
            dados.quantidadeEmEstoque = parseInt(dados.quantidadeEmEstoque)
            
            this._salvarEquipamento(dados)
            .then(() => {
                this._obterDadosEquipamentos();
                this.dialogAdicionarEditar.close();

            });
        }, 
        
        
        _carregarTiposEquipamento: function() {
            let urlRequisicaoTiposEquipamento = `${ENDPOINT_BASE}/tipos`;
            
            fetch(urlRequisicaoTiposEquipamento)
            .then(response => response.json())
            .then(dados => this.getView().setModel(new JSONModel(dados), MODELO_TIPO_EQUIPAMENTO))
        },
        
        _salvarEquipamento: function(dados) {
            let url = `${ENDPOINT_BASE}`;
            let metodo = 'POST';
            const idEquipamento = dados.id;

            if (idEquipamento) {
                url =  `${url}/${idEquipamento}`;
                metodo = 'PUT';
            }
            
            return fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
        },
        
        aoPressionarFecharTelaAdicionarEditar: function() {
            
           this.dialogAdicionarEditar.close();
        },
    });
});