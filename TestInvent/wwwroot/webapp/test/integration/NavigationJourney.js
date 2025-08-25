sap.ui.define([
	"sap/ui/test/opaQunit",
	"./pages/App"
], (opaTest) => {
	"use strict";

	QUnit.module("Navigation");

	opaTest("Should open the Editar dialog", (Given, When, Then) => {
		// Arrangements
		Given.iStartMyUIComponent({
			componentConfig: {
				name: "ui5.testinvent"
			}
		});

		//Actions
		When.onTheAppPage.euPressionoOBotaoDeAdicionar();

		// Assertions
		Then.onTheAppPage.deveriaAparecerOFormularioAdicionar();

		// Cleanup
		Then.iTeardownMyApp();
	});
});