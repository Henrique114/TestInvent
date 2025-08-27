sap.ui.define([
	"sap/ui/test/opaQunit",
	"./Lista",
	"./Detalhe",
	"./Cadastro"
	
], function (opaTest) {
	"use strict";

	QUnit.module("Dialog Formulario Adicionar equipamento.");

	opaTest("Fluxo de Adicionar completo", function (Given, When, Then) {
		Given.iStartMyApp();

		When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoAdicionar();
		When.naPaginaDeCadastroDeEquipamentos.clicandoEmSalvar();
		Then.naPaginaDeCadastroDeEquipamentos.nomeComErroDeValidacao();
		Then.naPaginaDeCadastroDeEquipamentos.tipoComErroDeValidacao();
		Then.naPaginaDeCadastroDeEquipamentos.quantidadeComErroDeValidacao();

		When.naPaginaDeCadastroDeEquipamentos.preenchendoNome("Asus");
		When.naPaginaDeCadastroDeEquipamentos.clicandoEmSalvar();
		Then.naPaginaDeCadastroDeEquipamentos.tipoComErroDeValidacao();
		Then.naPaginaDeCadastroDeEquipamentos.quantidadeComErroDeValidacao();

		When.naPaginaDeCadastroDeEquipamentos.preenchendoTipo();
		When.naPaginaDeCadastroDeEquipamentos.clicandoEmSalvar();
		Then.naPaginaDeCadastroDeEquipamentos.quantidadeComErroDeValidacao();

		When.naPaginaDeCadastroDeEquipamentos.preenchendoQuantidade(3);
		When.naPaginaDeCadastroDeEquipamentos.clicandoEmSalvar();

		Then.iTeardownMyApp();
	});
});
