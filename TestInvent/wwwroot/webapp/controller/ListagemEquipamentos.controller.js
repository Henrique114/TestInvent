sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
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
            this.aoAbrirFragmentoDialogo();
        },

        criarDialogo: function(view) {
            return Fragment.load({
                id: view.getId(),
                name: "ui5.testinvent.view.DetalhesEquipamento",
                controller: this
            }).then((dialog) => {
                dialog.setModel(); // você pode passar o modelo necessário como argumento, se desejar
                this.getOwnerComponent().getModel("i18n").getResourceBundle();   
                view.addDependent(dialog);
                this.oDialog = dialog;
                return dialog;
            });
        },

        aoAbrirFragmentoDialogo: function() {
           var view = this.getView();

            if (!this.byId("idDialog")) {
                this.criarDialogo(view)
                .then((dialog) => {
                    dialog.open();
                });
            } else {
                this.byId("idDialog").open();
            }
        },

         aoPrecionarFechar: function(evento) {
        this.oDialog.close();
        },

        aoCriarNovoEquipamento: function() {
           
        }
   });
});