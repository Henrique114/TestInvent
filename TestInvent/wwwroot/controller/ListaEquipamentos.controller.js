sap.ui.define([
	
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], (fetch, Controller) => {
	"use strict";

	return Controller.extend("ui5.testinvent.controller.ListaEquipamentos", {
		onInit: function() {
			 // Exemplo de requisição GET
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