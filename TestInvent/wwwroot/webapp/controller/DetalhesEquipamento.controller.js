sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], (Controller, History, JSONModel) => {
	"use strict";
	const MODELO_EQUIPAMENTO = "equipamento";
	const ENDPOINT_BASE = "/EquipamentoEletronico";
	const ID = "";
	const ROTA = "";

	return Controller.extend("ui5.testinvent.controller.DetalhesEquipamento", {
		onInit() {
			this.ROTA = this.getOwnerComponent().getRouter();
			this._oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			this.ROTA.getRoute("DetalhesEquipamento").attachPatternMatched(this._aoCoincidirRota, this);

			//TODO:
			//CRIA O MODELO DO EQUIPAMENTO
			// let dado = {
			// 	nome: "samsung-test",
			// 	tipo: "notebook",
			// 	quantidadeEmEstoque: 5,
			// 	dataDeInclusao: new Date("0001-01-01T00:00:00-02:00"),
			// 	temEmEstoque: true,
			// 	descricaoEquipamento: "Um notebook de teste da Samsung"
			// }

			// const oModel = new sap.ui.model.json.JSONModel(dado);
			// this.getView().setModel(oModel, MODELO_EQUIPAMENTO);

			//CRIA A BASE DA TELA
			 
			//JOGA ESSAS INFORMAÕES EM TELA 
		},

		// _setarRota: function () {
		// 	this.ROTA = this.getOwnerComponent().getRouter();	
		// },

		_aoCoincidirRota: function (oEvent) {
			this.ID = oEvent.getParameter("arguments").id;
			if(this.ID){
				this._obterEquipamentoPorId(this.ID);	
			}
        },

        _obterEquipamentoPorId: function (id) {
			let urlRequisicaoEquipamento = `${ENDPOINT_BASE}/${id}`;

            fetch(urlRequisicaoEquipamento)
                .then(response => response.json())
                .then(dado => {
					dado.dataDeInclusao = new Date(dado.dataDeInclusao);
                    const oModel = new JSONModel(dado);
                    this.getView().setModel(oModel, MODELO_EQUIPAMENTO);
                })
        },

		onNavBack() {
			const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.ROTA.navTo("ListagemEquipamentos", {}, true);
			}
		},
		getResourceBundle: function() {
				const nome = "i18n";
				return this
					.getOwnerComponent()
					.getModel(nome)
					.getResourceBundle();
        }

	});
});