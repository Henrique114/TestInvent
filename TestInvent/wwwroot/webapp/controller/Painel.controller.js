
sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent"
], (Controller, MessageToast, UIComponent) => {
   "use strict";

    return Controller.extend("ui5.testinvent.controller.Painel", {

        onInit: function () {

            this.roteador = UIComponent.getRouterFor(this);
            const nomeRotaEditar = "teste"; //conferir ids e definicoes dessa rota no manifest.json
            this.roteador.getRoute(nomeRotaEditar).attachPatternMatched(this._aoAcessarEditar, this);

            return this._aoAcessarListar();
        },

        _aoAcessarListar: function () {
            this._obterDadosEquipamentos();
        },

        _obterDadosEquipamentos: function(){
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