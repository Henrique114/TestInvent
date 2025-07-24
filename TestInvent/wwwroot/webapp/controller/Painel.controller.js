
sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent"
], (Controller, MessageToast, UIComponent) => {
   "use strict";

    return Controller.extend("ui5.testinvent.controller.Painel", {


        onInit: function () {
            debugger
            this.roteador = UIComponent.getRouterFor(this);
            this.roteador.getRoute("teste").attachPatternMatched(this._aoAcessarEditar, this);
        },

        _aoAcessarEditar: function () {
            debugger
            fetch("/EquipamentoEletronico")
                .then(function (response) {
                    debugger
                    return response.json(); // ou response.text(), response.blob(), etc.
                })
                .then(function (data) {
                    // Manipula os dados recebidos
                    const dados = data.json();
                    console.log(dados);
                    MessageToast.show(dados);

                    const oModel = new sap.ui.model.json.JSONModel(dados);
                    this.getView().setModel(oModel, "equipamentos");
                })
                .catch(function (error) {
                    // Trata erros da requisição
                    console.error("Erro na requisição:", error);
                });
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