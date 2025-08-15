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
    const ID_DETALHES_EQUIPAMENTO = "idDialogDetalhes";
    const ID_ADICIONAR_EDITAR_EQUIPAMENTO = "idAdicionarEditar";
    const NOME_FRAGMENT_DETALHES = "ui5.testinvent.view.DetalhesEquipamento";
    const NOME_FRAGMENT_ADICIONAR_EDITAR_EQUIPAMENTO = "ui5.testinvent.view.AdicionarEditarEquipamento";
    const MODELO_EQUIPAMENTOS_LISTAGEM = "equipamentos";
    const MODELO_EQUIPAMENTO_SELECIONADO_LISTA = "equipamentoSelecionadoLista";
    const MODELO_TIPOS_EQUIPAMENTO = "modeloTipoEquipamento"; 
    const MODELO_NOVO_EQUIPAMENTO = "novoEquipamento";
    const MODELO_TRADUCAO = "i18n";
    
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
                    const dadosTipo = this.getView().getModel(MODELO_TIPOS_EQUIPAMENTO).getData();

                    equipamentos.forEach(element => {
                        element.dataDeInclusao = new Date(element.dataDeInclusao);
                        element.descricaoDoTipo = formatter.obterDescricaoDoEnum(element.tipo, dadosTipo); 
                    });

                    const model = new JSONModel(equipamentos);
                    this.getView().setModel(model, MODELO_EQUIPAMENTOS_LISTAGEM);
            })
        },

        aoFiltrarEquipamentos: function (evento){
            const _query = evento.getParameter("query");
            this._obterDadosEquipamentos(_query);
        },
        
        aoIrParaDetalhes: function (evento) {   

            const equipamentoSelecionado = evento
                .getSource()
                .getBindingContext(MODELO_EQUIPAMENTOS_LISTAGEM)
                .getObject();

            this.getView().setModel(new JSONModel(equipamentoSelecionado), MODELO_EQUIPAMENTO_SELECIONADO_LISTA);
            this._AbrirTelaDeDetalhes();
        },

        _AbrirTelaDeDetalhes: function() {
           var view = this.getView();
           var dialogDetalhes = this.byId(ID_DETALHES_EQUIPAMENTO);

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

        aoPressionarAdicionarEquipamento: function() {

            this._AbrirTelaAdicionarEEditarEquipamento(null);
        },

        aoPressionarEditar: function(evento) { 

            if (this.dialogDetalhes && this.dialogDetalhes.isOpen()) {
                this.dialogDetalhes.close();
            }
            
            let idEquipamento = null;
            
            if ( evento.getSource().getCustomData()) {
               
                idEquipamento = evento
                                .getSource()
                                .getCustomData()[0]
                                .getValue();
            }

            this._AbrirTelaAdicionarEEditarEquipamento(idEquipamento); 
        },

        _AbrirTelaAdicionarEEditarEquipamento: function(idEquipamento) {
           var view = this.getView();
           var dialogAdicionarEditar = this.byId(ID_ADICIONAR_EDITAR_EQUIPAMENTO);
           
            if (!dialogAdicionarEditar) {
                 this._criarTelaAdicionarEEditarEquipamento(view)
                    .then((dialogAdicionarEditar) => dialogAdicionarEditar.open());
            } else{

                dialogAdicionarEditar.setModel(new JSONModel({}), MODELO_NOVO_EQUIPAMENTO);
                dialogAdicionarEditar.open();
                
            }
            if (idEquipamento) {
                try {
                    let dadosEquipamento =  this._carregarEquipamentoParaEdicao(idEquipamento)
                    .then(() => dialogAdicionarEditar.setModel(new JSONModel({dadosEquipamento}), MODELO_NOVO_EQUIPAMENTO) );
                    
                } catch (error) {
                    console.error("Erro ao carregar equipamento:", error);
                }
            }
        },

        _criarTelaAdicionarEEditarEquipamento: function(view) {
            return Fragment.load({
                id: view.getId(),
                name: NOME_FRAGMENT_ADICIONAR_EDITAR_EQUIPAMENTO,
                controller: this

            }).then((dialogAdicionarEditar) => {
                dialogAdicionarEditar.setModel(new JSONModel({}), MODELO_NOVO_EQUIPAMENTO);

                this._carregarTiposEquipamento();
                dialogAdicionarEditar.setModel(this.getView().getModel(MODELO_TIPOS_EQUIPAMENTO)); 
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
                    const modelo = this.byId(ID_ADICIONAR_EDITAR_EQUIPAMENTO).getModel(MODELO_NOVO_EQUIPAMENTO);
                    modelo.setData(dados);
                    modelo.refresh(true);
                   
                });
        },

        aoPressionarSalvar: function() {
            const dados = this.dialogAdicionarEditar.getModel(MODELO_NOVO_EQUIPAMENTO).getData();
            
            if (!ServicoValidador.validarFormulario.call(this)) {
                return;
            }
            
            dados.tipo = parseInt(dados.tipo),
            dados.quantidadeEmEstoque = parseInt(dados.quantidadeEmEstoque)
            
            this._salvarEquipamento(dados)
            .then(() => {
                this._obterDadosEquipamentos();
                this.dialogAdicionarEditar.destroy();

            });
        }, 
        
        _carregarTiposEquipamento: function() {
            let urlRequisicaoTiposEquipamento = `${ENDPOINT_BASE}/tipos`;
            
            fetch(urlRequisicaoTiposEquipamento)
            .then(response => response.json())
            .then(dados => this.getView().setModel(new JSONModel(dados), MODELO_TIPOS_EQUIPAMENTO))
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