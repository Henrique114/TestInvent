
sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, UIComponent, JSONModel) => {
   "use strict";

    return Controller.extend("ui5.testinvent.controller.Painel", {

        onInit: function () {

            let oModelo = new JSONModel([]);
            this.getView().setModel(oModelo, "equipamentos");
            debugger;
            let oRouter = this.getOwnerComponent().getRouter();
            const nomeRotaListar = "ListagemEquipamentos"; //conferir ids e definicoes dessa rota no manifest.json

            oRouter.getRoute(nomeRotaListar).attachPatternMatched(this._obterDadosEquipamentos, this);

            // let oRouter = UIComponent.getRouterFor(this);
            // debugger;
            // oRouter.getRoute("teste").attachPatternMatched(this._obterDadosEquipamentos, this);
            

           
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
        },

        onShowHello() {
         // // read msg from i18n model
         // const oBundle = this.getView().getModel("i18n").getResourceBundle();
         // const sRecipient = this.getView().getModel().getProperty("/recipient/name");
         // const sMsg = oBundle.getText("helloMsg", [sRecipient]);

         // // show message
        
           fetch("https://localhost:7104/EquipamentoEletronico")
                 .then(function(response) {
                     return response.json(); // ou response.text(), response.blob(), etc.
                 })
                 .then(function(data) {
                     // Manipula os dados recebidos
                     console.log(data);
			 		MessageToast.show(data);
                 })
                 .catch(function(error) {
                     // Trata erros da requisição
                     console.error("Erro na requisição:", error);
                 });
			

         
      }
   });
});