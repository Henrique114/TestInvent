
sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
], (Controller, JSONModel) => {
    "use strict";

    const ENDPOINT_BASE = "/EquipamentoEletronico";
    const ROTA_LISTAGEM = "ListagemEquipamentos";
    const MODELO_EQUIPAMENTOS = "equipamentos";
    const ROTA = "";

    return Controller.extend("ui5.testinvent.controller.Painel", {

        onInit: function () {
            this._inicializarI18n();
            this._definirValorDaRota();
            if(this.ROTA){
                this.ROTA.getRoute(ROTA_LISTAGEM).attachPatternMatched(this._aoAcessarListar, this);
            }
        },
        
        _inicializarI18n: function(){
            return this._oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        _definirValorDaRota: function () {
            this.ROTA = this.getOwnerComponent().getRouter();
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