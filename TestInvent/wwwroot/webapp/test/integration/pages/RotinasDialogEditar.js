sap.ui.define([
	"sap/ui/test/opaQunit",
	"./Lista",
	"./Detalhe",
	"./Adicionar",
    "./Editar",
	
], function (opaTest) {
	"use strict";

	QUnit.module("Dialog Formulario Editar equipamento.");

	opaTest("Rotinas de Edição e equipamento.", function (Given, When, Then) {
		Given.iStartMyApp();

        When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoEditarLinha1();
        Then.naPaginaDeEditarDeEquipamentos.dialogDeEditarAberto();
        When.naPaginaDeEditarDeEquipamentos.limparCampoNome("");
		When.naPaginaDeEditarDeEquipamentos.clicandoEmSalvar();
		Then.naPaginaDeEditarDeEquipamentos.nomeComErroDeValidacao();
		When.naPaginaDeEditarDeEquipamentos.preenchendoNome("Acer");
		When.naPaginaDeEditarDeEquipamentos.clicandoEmSalvar();
        
		When.naPaginaDeListagemDeEquipamentos.clicandoNoItemEAbrindoTelaDeDetalhes("Acer");
        Then.naPaginaDeDetalheDeEquipamento.dialogDeDetalhesFoiAberto();
        Then.naPaginaDeDetalheDeEquipamento.confirmaSeItemAbertoCorrespondeAoSelecionado("Acer");
        When.naPaginaDeDetalheDeEquipamento.pressionandoBotaoEditarEmDetalhes();
        Then.naPaginaDeEditarDeEquipamentos.dialogDeEditarAberto();
        When.naPaginaDeEditarDeEquipamentos.limparCampoNome("");
		When.naPaginaDeEditarDeEquipamentos.clicandoEmSalvar();
		Then.naPaginaDeEditarDeEquipamentos.nomeComErroDeValidacao();
		When.naPaginaDeEditarDeEquipamentos.preenchendoNome("Samsung");
		When.naPaginaDeEditarDeEquipamentos.clicandoEmSalvar();

		Then.iTeardownMyApp();
	});
});
