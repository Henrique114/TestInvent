sap.ui.define([
	"sap/ui/test/opaQunit",
	"./Lista",
	"./Detalhe",
	"./Adicionar"
], function (opaTest) {
	"use strict";

	QUnit.module("Dialog Formulario Adicionar equipamento.");

	opaTest("Rotinas de adicionar novo equipamento", function (Given, When, Then) {
		Given.iStartMyApp();

		When.naPaginaDeListagemDeEquipamentos.conferindoAAberturaDoDialogpressionandoBotaoAdicionar();
		When.naPaginaDeAdicionarDeEquipamentos.precionandoOBotaoSalvarParaSalvarOsDadosDoFormurarioDeAdicionar();
		Then.naPaginaDeAdicionarDeEquipamentos.verificandoSeOsCamposEstaoInformandoComAsMensagensDeValidacao();

		When.naPaginaDeAdicionarDeEquipamentos.clicandoNoInputDoNomeEInseridoUmNomeNoFormularioDeAdicionar("Asus");
		When.naPaginaDeAdicionarDeEquipamentos.precionandoOBotaoSalvarParaSalvarOsDadosDoFormurarioDeAdicionar();
		Then.naPaginaDeAdicionarDeEquipamentos.verificandoSeOsCamposEstaoInformandoComAsMensagensDeValidacao();

		When.naPaginaDeAdicionarDeEquipamentos.clicandoNoSelectDoTipoESelecionandoUmTipoNoFormularioDeAdicionar("Monitor");
		When.naPaginaDeAdicionarDeEquipamentos.precionandoOBotaoSalvarParaSalvarOsDadosDoFormurarioDeAdicionar();
		Then.naPaginaDeAdicionarDeEquipamentos.verificandoSeOsCamposEstaoInformandoComAsMensagensDeValidacao();

		When.naPaginaDeAdicionarDeEquipamentos.clicandoNoInputDoQuantidadeEInseridoUmNumeroNoFormularioDeAdicionar(3);
		When.naPaginaDeAdicionarDeEquipamentos.precionandoOBotaoSalvarParaSalvarOsDadosDoFormurarioDeAdicionar();

		Then.iTeardownMyApp();
	});
});
