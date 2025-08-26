sap.ui.define([
	"sap/ui/test/opaQunit",
	"./Lista",
	"./Detalhe",
	"./Cadastro"
], function (opaTest) {
	"use strict";

	QUnit.module("Tela Listagem de Equipamento");

	opaTest("Fluxo de listagem completo", function (Given, When, Then) {
		Given.iStartMyApp();

		Then.naPaginaDeListagemDeEquipamentos.paginaDeListaAberta();
		Then.naPaginaDeListagemDeEquipamentos.tabelaCarregadaComDados();

		When.naPaginaDeListagemDeEquipamentos.euBuscoPorNome("Teste 1");
		Then.naPaginaDeListagemDeEquipamentos.tabelaContemItem("Teste 1");

		

		Then.iTeardownMyApp();
	});
});
