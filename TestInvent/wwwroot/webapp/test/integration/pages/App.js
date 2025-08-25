sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press"
], (Opa5, Press) => {
	"use strict";

	const sViewName = "ui5.testinvent.view.ListagemEquipamentos";

	Opa5.createPageObjects({
		onTheAppPage: {
			actions: {
				euPressionoOBotaoDeAdicionar() {
					return this.waitFor({
						id: "btnAdicionarEquipamento",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Não foi encontrado o botão de Adicionar equipamento"
					});
				}
			},

			assertions: {
				deveriaAparecerOFormularioAdicionar() {
					return this.waitFor({
						controlType: "sap.m.Dialog",
						success() {
							// we set the view busy, so we need to query the parent of the app
							Opa5.assert.ok(true, "O Dialog com formulario Adicionar equipamento foi aberto!");
						},
						errorMessage: "Não foi possivel encontrar o Dialog."
					});
				}
			}
		}
	});
});