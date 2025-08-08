sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
],(Controller, JSONModel, Fragment) => {
    "use strict";

    const ENDPOINT_BASE = "/EquipamentoEletronico";
    const ROTA_LISTAGEM = "ListagemEquipamentos";
    const MODELO_EQUIPAMENTOS = "equipamentos";

    return Controller.extend("ui5.testinvent.controller.ListagemEquipamentos", {
        onInit: function () {
            this._oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            const rota = this.getOwnerComponent().getRouter();
            rota.getRoute(ROTA_LISTAGEM).attachPatternMatched(this._aoAcessarListar, this);
        
        },

        _aoAcessarListar: function () {
            this._obterDadosEquipamentos();
        },

        _obterDadosEquipamentos: function (nome = "") {
            
            let urlRequisicaoEquipamentos = `${ENDPOINT_BASE}${nome ? "?filtro=" + encodeURIComponent(nome) : ""}`;

            fetch(urlRequisicaoEquipamentos)
                .then(response => response.json())
                .then(dados => {
                    dados.forEach(element => {
                        element.dataDeInclusao = new Date(element.dataDeInclusao);
                        element.tipo = this._mapearTipoDoEquipamneto(element.tipo);
                    });

                    const model = new JSONModel(dados);
                    this.getView().setModel(model, MODELO_EQUIPAMENTOS);
            })
                
        },

        aoFiltrarEquipamentos: function (event) 
        {
            const _query = event.getParameter("query");
            this._obterDadosEquipamentos(_query);
        },
        
        aoIrParaDetalhes: function (event) {
            
            const equipamentoSelecionado = event.getSource().getBindingContext(MODELO_EQUIPAMENTOS).getObject();
            const oModelEquipamento = new JSONModel(equipamentoSelecionado);
            this.getView().setModel(oModelEquipamento, "modeloDialogo");
            this.AoAbrirTelaDeDetalhes();
        },

        AoAbrirTelaDeDetalhes: function() {
           var view = this.getView();

            if (!this.byId("idDialog")) {
                this.criarTelaDeDetalhes(view)
                .then((dialog) => {
                    dialog.open();
                });
            } else {
                this.byId("idDialog").open();
            }
        },

        criarTelaDeDetalhes: function(view) {
          
            return Fragment.load({
                id: view.getId(),
                name: "ui5.testinvent.view.DetalhesEquipamento",
                controller: this
            }).then((dialog) => {
                dialog.setModel(); 
                this.getOwnerComponent().getModel("i18n").getResourceBundle();   
                view.addDependent(dialog);
                this.oDialog = dialog;
                return dialog;
            });
        },

        aoIrParaNovoEquipamento: function() {
                   
            this.AoAbrirTelaDeNovoEquipamento();
           
        },

         AoAbrirTelaDeNovoEquipamento: function() {
           var view = this.getView();

            if (!this.byId("idCadastroEAlterar")) {
                this.criarTelaDeNovoEquipamento(view)
                .then((dialog) => {
                    dialog.open();
                });
            } else {
                this.byId("idCadastroEAlterar").open();
            }
        },

         criarTelaDeNovoEquipamento: function(view) {
            
            return Fragment.load({
                id: view.getId(),
                name: "ui5.testinvent.view.AdicionarEAtualizarEquipamento",
                controller: this
            }).then((dialog) => {

                dialog.setModel(new JSONModel({}), "modeloEquipamento");
                this._carregarTiposEquipamento();
                dialog.setModel(this.getView().getModel("modeloTipoEquipamento")); 
                this.getOwnerComponent().getModel("i18n").getResourceBundle();   
                view.addDependent(dialog);
                this.oDialog = dialog;
                return dialog;
            });
        },

        aoPrecionarFechar: function(evento) {
            this.oDialog.close();
        },

        aoPrecionarSalvar: function(evento) {
            const dialog = this.byId("idCadastroEAlterar");
            const dados = dialog.getModel("modeloEquipamento").getData();
            const dadosTipo = dialog.getModel("modeloTipoEquipamento").getData();

            const objeto = {
                nome: dados.nome,
                tipo: parseInt(dadosTipo.tipoSelecionado),
                quantidadeEmEstoque: parseInt(dados.quantidadeEmEstoque),
                descricao: dados.descricao
            };

            const url = `${ENDPOINT_BASE}`;
            const metodo = 'POST';

            const resposta = fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objeto)
            })
            .then(resposta => resposta.json())
            .then(dialog => {
                this.oDialog.close();
            });
        },    
        
        _carregarTiposEquipamento: function() {
                
                var modeloTipoEquipamento = new JSONModel({
                tipos: [
                    { tipo: 1, descricao: "Notebook" },
                    { tipo: 2, descricao: "Teclado" },
                    { tipo: 3, descricao: "Mouse" },
                    { tipo: 4, descricao: "Monitor" },
                    { tipo: 5, descricao: "Headset" },
                ],
                tipoSelecionado: "Notebook" 
            });

            this.getView().setModel(modeloTipoEquipamento, "modeloTipoEquipamento");
        },

        _mapearTipoDoEquipamneto: function(tipo) {
            var tipoS = "";
            switch (tipo) {
                case 1:
                    tipoS = "Notebook";
                    break;
                case 2:
                    tipoS = "Teclado";
                    break;
                case 3:
                    tipoS = "Mouse";
                    break;
                case 4:
                    tipoS = "Monitor";
                    break;
                case 5:
                    tipoS = "Headset";
                    break;
               
                default:
                    tipoS = "Outros";
            }
            return tipoS;
        }, 
   });
});