sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], (Controller, History) => {
	"use strict";

	return Controller.extend("ui5.testinvent.controller.DetalhesEquipamento", {
		onInit() {
			this._oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

			const rota = this.getOwnerComponent().getRouter();
			rota.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
		},

		_setarModeloEquipamento(evento) {
			
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(evento.getParameter("arguments").caminhoParaEquipamento),
				model: "equipamento"
			});
		},

		aoRetornarParaListagem() {
			const historico = History.getInstance();
			const sPreviousHash = historico.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const rota = this.getOwnerComponent().getRouter();
				rota.navTo("ListagemEquipamentos", {}, true);
			}
		}
	});
});