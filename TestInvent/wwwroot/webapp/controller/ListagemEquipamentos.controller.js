
sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, MessageToast, JSONModel) => {
    "use strict";
    const ENDPOINT_BASE = "/EquipamentoEletronico";
    const ENDPOINT_FILTRO = "/lookingfor" 
    const ROTA_LISTAGEM = "ListagemEquipamentos";
    const MODELO_EQUIPAMENTOS = "equipamentos";

    return Controller.extend("ui5.testinvent.controller.Painel", {
        

        onInit: function () {

            this._oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute(ROTA_LISTAGEM).attachPatternMatched(this._obterDadosEquipamentos, this);
           
        },

        _aoAcessarListar: function () {
            
            this._obterDadosEquipamentos();
        },

        _obterDadosEquipamentos: function () {
               
            fetch(ENDPOINT_BASE)
                .then(response => response.json())
                .then(equipamentos => this._setarModeloEquipamentos(equipamentos))
                .catch(error => console.error("Erro na requisição:", error));
        },

        _setarModeloEquipamentos: function (equipamentos) {

            if (!equipamentos || !Array.isArray(equipamentos)) {
                MessageToast.show("Nenhum equipamento encontrado.");
                return;
            }
            const oModel = new JSONModel(equipamentos);
            
            return this.getView().setModel(oModel, MODELO_EQUIPAMENTOS);
        },

        onFiltrarEquipamentos: function (oEvent) 
        {
            var sQuery = oEvent.getParameter("query");
            debugger;
            if (sQuery) {
                fetch(`${ENDPOINT_FILTRO}?nome=${sQuery}`)
                    .then(response => response.json())
                    .then(equipamentos => this.onVinculandoFiltro(equipamentos))
                    .catch(error => console.error("Erro na requisição:", error));
            }

            
        },

        onVinculandoFiltro: function (equipamentos) {

            if (!equipamentos || !Array.isArray(equipamentos)) {
                MessageToast.show("Nenhum equipamento encontrado.");
                return;
            }
            const oModel = new JSONModel(equipamentos);

            return this.getView().setModel(oModel, MODELO_EQUIPAMENTOS);
        }
        
   });
});