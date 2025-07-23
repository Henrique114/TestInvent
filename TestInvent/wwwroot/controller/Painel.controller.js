
sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
], (Controller, MessageToast) => {
   "use strict";

   return Controller.extend("ui5.testinvent.controller.Painel", {
      onShowHello() {
         // // read msg from i18n model
         // const oBundle = this.getView().getModel("i18n").getResourceBundle();
         // const sRecipient = this.getView().getModel().getProperty("/recipient/name");
         // const sMsg = oBundle.getText("helloMsg", [sRecipient]);

         // // show message
        
           fetch("/EquipamentoEletronico")
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