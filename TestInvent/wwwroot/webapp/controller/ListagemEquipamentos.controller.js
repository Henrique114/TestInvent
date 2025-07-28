
sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
    "use strict";
    const ENDPOINT_BASE = "https://localhost:7104/EquipamentoEletronico";
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
            const oModel = new sap.ui.model.json.JSONModel(equipamentos);
            
            return this.getView().setModel(oModel, MODELO_EQUIPAMENTOS);
        },

        onFiltrarEquipamentos: function () 
        {
              fetch(ENDPOINT_BASE + "/lookingfor")
                .then(response => response.json())
                .then(equipamentos => this._setarModeloEquipamentos(equipamentos))
                .catch(error => console.error("Erro na requisição:", error));

        }

        
   });
});