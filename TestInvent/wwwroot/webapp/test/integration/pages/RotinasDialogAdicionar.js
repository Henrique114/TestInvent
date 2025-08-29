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

		When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoAdicionar();
		When.naPaginaDeAdicionarDeEquipamentos.clicandoEmSalvar();
		Then.naPaginaDeAdicionarDeEquipamentos.nomeComErroDeValidacao();
		Then.naPaginaDeAdicionarDeEquipamentos.tipoComErroDeValidacao();
		Then.naPaginaDeAdicionarDeEquipamentos.quantidadeComErroDeValidacao();

		When.naPaginaDeAdicionarDeEquipamentos.preenchendoNome("Asus");
		When.naPaginaDeAdicionarDeEquipamentos.clicandoEmSalvar();
		Then.naPaginaDeAdicionarDeEquipamentos.tipoComErroDeValidacao();
		Then.naPaginaDeAdicionarDeEquipamentos.quantidadeComErroDeValidacao();

		When.naPaginaDeAdicionarDeEquipamentos.preenchendoTipo("Monitor");
		When.naPaginaDeAdicionarDeEquipamentos.clicandoEmSalvar();
		Then.naPaginaDeAdicionarDeEquipamentos.quantidadeComErroDeValidacao();

		When.naPaginaDeAdicionarDeEquipamentos.preenchendoQuantidade(3);
		When.naPaginaDeAdicionarDeEquipamentos.clicandoEmSalvar();

		Then.iTeardownMyApp();
	});
});
