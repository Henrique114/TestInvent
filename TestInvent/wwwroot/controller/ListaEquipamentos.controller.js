sap.ui.define([
	
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent"
], (fetch, Controller, JSONModel, MessageToast, UIComponent) => {
	"use strict";

    const MODELO_EQUIPAMENTO = "equipamentos";

    return Controller.extend("ui5.testinvent.controller.ListaEquipamentos", {
        
        onInit: function () {
            debugger
            this.roteador = UIComponent.getRouterFor(this);
            this.roteador.getRoute("teste").attachPatternMatched(this._aoAcessarEditar, this);
        },

        _aoAcessarEditar: function () {
            debugger
            fetch("https://localhost:7104/EquipamentoEletronico")
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
        }
        
    }); 
       
	
});