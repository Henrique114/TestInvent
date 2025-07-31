
sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "../model/formatter" 
], (Controller, MessageToast, JSONModel, formatter) => {
    "use strict";
    const ENDPOINT_BASE = "/EquipamentoEletronico";
    const ROTA_LISTAGEM = "ListagemEquipamentos";
    const MODELO_EQUIPAMENTOS = "equipamentos";
    

    return Controller.extend("ui5.testinvent.controller.Painel", {
         formatter: formatter,

        onInit: function () {

            this._oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            let rota = this.getOwnerComponent().getRouter();
            rota.getRoute(ROTA_LISTAGEM).attachPatternMatched(this._aoAcessarListar, this);
           
        },

        _aoAcessarListar: function () {
            
            this._obterDadosEquipamentos();
        },

        _obterDadosEquipamentos: function (nome = "") {
            
            
            fetch(`${ENDPOINT_BASE}${nome ? "?nome=" + encodeURIComponent(nome) : ""}`)
                .then(response => response.json())
                .then(dados => {
                    dados.dataDeInclusao = new Date(dados.dataDeInclusao);
                    const oModel = new sap.ui.model.json.JSONModel(dados);
                    this.getView().setModel(oModel, MODELO_EQUIPAMENTOS);
                })
                .catch(error => {
                    console.error("Erro ao buscar clientes:", error);
                });
        },

        _setarModeloEquipamentos: function (equipamentos) {

            if (!equipamentos || !Array.isArray(equipamentos)) {
                MessageToast.show("Nenhum equipamento encontrado.");
                return;
            }
            const modelo = new JSONModel(equipamentos);
            
            return this.getView().setModel(modelo, MODELO_EQUIPAMENTOS);
        },

        aoFiltrarEquipamentos: function (event) 
        {
            // Obter o valor do campo de pesquisa
            const _query = event.getParameter("query");
            this._obterDadosEquipamentos(_query);
        }
        
   });
});