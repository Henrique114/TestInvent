
sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
   "use strict";

    return Controller.extend("ui5.testinvent.controller.Painel", {

        onInit: function () {

            let oModelo = new JSONModel([]);
            this.getView().setModel(oModelo, "equipamentos");
            debugger;
            let oRouter = this.getOwnerComponent().getRouter();
            const nomeRotaListar = "ListagemEquipamentos";

            oRouter.getRoute(nomeRotaListar).attachPatternMatched(this._obterDadosEquipamentos, this);
           
        },

        _aoAcessarListar: function () {
            debugger;
            this._obterDadosEquipamentos();
        },

        _obterDadosEquipamentos: function () {
            debugger;   
            const nomeRotaEquipamentos = "/EquipamentoEletronico"; 
            fetch(nomeRotaEquipamentos)
                .then(response => response.json())
                .then(equipamentos => this._setarModeloEquipamentos(equipamentos))
                .catch(error => console.error("Erro na requisição:", error));
        },

        _setarModeloEquipamentos: function(equipamentos){
            const oModel = new sap.ui.model.json.JSONModel(equipamentos);
            
            const nomeModeloEquipamentos = "equipamentos"
            return this.getView().setModel(oModel, nomeModeloEquipamentos);
        }

        
   });
});