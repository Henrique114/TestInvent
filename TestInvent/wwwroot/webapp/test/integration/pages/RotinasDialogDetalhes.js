sap.ui.define([
	"sap/ui/test/opaQunit",
	"./Lista",
	"./Detalhe",
	"./Adicionar"
], function (opaTest) {
	"use strict";

	QUnit.module("Dialog de exibição de detalhes do equipamento selecionado.");

	opaTest("Opções do Dialog de exibição detalhes.", function (Given, When, Then) {
		Given.iStartMyApp();

        When.naPaginaDeListagemDeEquipamentos.clicandoNoItemEAbrindoTelaDeDetalhes("TesteA");
	    Then.naPaginaDeDetalheDeEquipamento.dialogDeDetalhesFoiAberto();

        Then.naPaginaDeDetalheDeEquipamento.confirmaSeItemAbertoCorrespondeAoSelecionado("TesteA");

        When.naPaginaDeDetalheDeEquipamento.pressionandoBotaoEditarEmDetalhes();
        When.naPaginaDeAdicionarDeEquipamentos.fechandoDialogDeAdicionar();

        When.naPaginaDeListagemDeEquipamentos.clicandoNoItemEAbrindoTelaDeDetalhes("TesteA");

        When.naPaginaDeDetalheDeEquipamento.pressionandoBotaoDeletarEmDetalhes();
        When.naPaginaDeListagemDeEquipamentos.cancelandoNaConfirmacaoDeDeletar();

        When.naPaginaDeListagemDeEquipamentos.clicandoNoItemEAbrindoTelaDeDetalhes("TesteB");
        When.naPaginaDeDetalheDeEquipamento.fechandoDialogDeDetalhes();

		Then.iTeardownMyApp();
	});
});
