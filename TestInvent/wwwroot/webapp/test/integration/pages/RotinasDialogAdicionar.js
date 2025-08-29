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
		Then.naPaginaDeAdicionarDeEquipamentos.tipoComErroDeValidacao();
		Then.naPaginaDeAdicionarDeEquipamentos.quantidadeComErroDeValidacao();

		When.naPaginaDeAdicionarDeEquipamentos.clicandoNoInputDoNomeEInseridoUmNomeNoFormularioDeAdicionar("Asus");
		When.naPaginaDeAdicionarDeEquipamentos.precionandoOBotaoSalvarParaSalvarOsDadosDoFormurarioDeAdicionar();
		Then.naPaginaDeAdicionarDeEquipamentos.tipoComErroDeValidacao();
		Then.naPaginaDeAdicionarDeEquipamentos.quantidadeComErroDeValidacao();

		When.naPaginaDeAdicionarDeEquipamentos.clicandoNoSelectDoTipoESelecionandoUmTipoNoFormularioDeAdicionar("Monitor");
		When.naPaginaDeAdicionarDeEquipamentos.precionandoOBotaoSalvarParaSalvarOsDadosDoFormurarioDeAdicionar();
		Then.naPaginaDeAdicionarDeEquipamentos.quantidadeComErroDeValidacao();

		When.naPaginaDeAdicionarDeEquipamentos.clicandoNoInputDoQuantidadeEInseridoUmNumeroNoFormularioDeAdicionar(3);
		When.naPaginaDeAdicionarDeEquipamentos.precionandoOBotaoSalvarParaSalvarOsDadosDoFormurarioDeAdicionar();

		Then.iTeardownMyApp();
	});
});
