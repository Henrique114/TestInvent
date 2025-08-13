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
    const ID_TELA_DETALHES = "idDialog";  
    const ID_TELA_NOVO_EQUIPAMENTO = "idCadastroEAlterar";
    const NOME_FRAGMENT_DETALHES = "ui5.testinvent.view.DetalhesEquipamento";
    const NOME_FRAGMENT_NOVO_EQUIPAMENTO = "ui5.testinvent.view.AdicionarEAtualizarEquipamento";
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

        aoFiltrarEquipamentos: function (event){
            const _query = event.getParameter("query");
            this._obterDadosEquipamentos(_query);
        },
        
        aoIrParaDetalhes: function (event) {   
            const equipamentoSelecionado = event
                .getSource()
                .getBindingContext(MODELO_EQUIPAMENTOS)
                .getObject();

            this.getView().setModel(new JSONModel(equipamentoSelecionado), ITEM_SELECIONADO_LISTA);
            this.AoAbrirTelaDeDetalhes();
        },

        AoAbrirTelaDeDetalhes: function() {
           var view = this.getView();
           var id = this.byId(ID_TELA_DETALHES);

            if (!id) {
               return this.criarTelaDeDetalhes(view)
                    .then((dialog) => dialog.open());
            }else{            
                id.open();
            }
        },

        criarTelaDeDetalhes: function(view) {
            return Fragment.load({
                id: view.getId(),
                name: NOME_FRAGMENT_DETALHES,
                controller: this
            }).then((dialogDetalhes) => {
                dialogDetalhes.setModel(); 
                this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();   
                view.addDependent(dialogDetalhes);
                this.oDialogDetalhes = dialogDetalhes;
                return dialogDetalhes;
            });
        },
        
        aoPressionarFecharDetalhes: function() {
            this.oDialogDetalhes.close();
        },

        aoIrParaAdicionarEEditarEquipamento: function(evento) { 
            const idEquipamento = evento.getSource()
                        .getBindingContext(MODELO_EQUIPAMENTOS)
                        .getObject().id;
                         console.log(idEquipamento);

                        
                        

            this.AoAbrirTelaAdicionarEEditarEquipamento(idEquipamento); 
        },

        AoAbrirTelaAdicionarEEditarEquipamento: function(idEquipamento) {
           var view = this.getView();
           var id = this.byId(ID_TELA_NOVO_EQUIPAMENTO);

           console.log(idEquipamento, id ,);
           debugger;

            if (!id) {
                 this.criarTelaAdicionarEEditarEquipamento(view)
                    .then((dialog) => dialog.open());
            } else{
                id.setModel(new JSONModel({}), NOVO_EQUIPAMENTO);
                id.open();
            }

            if (idEquipamento) {
                this._carregarEquipamentoParaEdicao(idEquipamento);
            }
        },

        criarTelaAdicionarEEditarEquipamento: function(view) {
            return Fragment.load({
                id: view.getId(),
                name: NOME_FRAGMENT_NOVO_EQUIPAMENTO,
                controller: this
            }).then((dialog) => {
                dialog.setModel(new JSONModel({}), NOVO_EQUIPAMENTO);
                this._carregarTiposEquipamento();
                dialog.setModel(this.getView().getModel(MODELO_TIPO_EQUIPAMENTO)); 
                this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();   
                view.addDependent(dialog);
                this.oDialog = dialog;
                return dialog;
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
            const dialog = this.byId(ID_TELA_NOVO_EQUIPAMENTO);
            const dados = dialog.getModel(NOVO_EQUIPAMENTO).getData();
            
            
            if (!ServicoValidador.validarFormulario.call(this)) {
                return;
            }
            
            dados.tipo = parseInt(dados.tipo),
            dados.quantidadeEmEstoque = parseInt(dados.quantidadeEmEstoque)
            
            this._salvarEquipamento(dados)
            .then(() => {
                this._obterDadosEquipamentos();
                this.oDialog.close();
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
                debugger;
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
        
        aoPressionarFechar: function() {
           this.oDialog.close();
        },
    });
});