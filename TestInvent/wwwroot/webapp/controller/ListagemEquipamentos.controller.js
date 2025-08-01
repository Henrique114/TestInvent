
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
    const ROTA = this.getOwnerComponent().getRouter();
    

    return Controller.extend("ui5.testinvent.controller.Painel", {
         formatter: formatter,

        onInit: function () {

            this._oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            ROTA.getRoute(ROTA_LISTAGEM).attachPatternMatched(this._aoAcessarListar, this);
           
        },

        _aoAcessarListar: function () {
            
            this._obterDadosEquipamentos();
        },

        _obterDadosEquipamentos: function (nome = "") {
            
            let urlRequisicaoEquipamentos = `${ENDPOINT_BASE}${nome ? "?filtro=" + encodeURIComponent(nome) : ""}`;

            fetch(urlRequisicaoEquipamentos)
                .then(response => response.json())
                .then(dados => {
                    dados.forEach(element => {
                        element.dataDeInclusao = new Date(element.dataDeInclusao);
                    });

                    this._setarModeloEquipamentos(dados);
                    const oModel = new JSONModel(dados);
                    this.getView().setModel(oModel, MODELO_EQUIPAMENTOS);
                })
                
        },

        aoFiltrarEquipamentos: function (event) 
        {
            const _query = event.getParameter("query");
            this._obterDadosEquipamentos(_query);
        }
        
   });
});