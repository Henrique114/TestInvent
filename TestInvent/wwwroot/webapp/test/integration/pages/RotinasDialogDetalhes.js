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

        When.naPaginaDeListagemDeEquipamentos.clicandoEmUmaLinhaDaListaParaAbrirODialogDeDetalhes("TesteA");
	    Then.naPaginaDeDetalheDeEquipamento.verificandoSeODialogDeDetalhesEstaAberto();

        Then.naPaginaDeDetalheDeEquipamento.confirmandoSeItemAbertoCorrespondeAoSelecionado("TesteA");

        When.naPaginaDeDetalheDeEquipamento.pressionandoBotaoEditarEmDetalhes();
        When.naPaginaDeEditarDeEquipamentos.pressionandoOBotaoCancelarNoDialogDeEdicaoParaFecharDialogDeEditar();

        When.naPaginaDeListagemDeEquipamentos.clicandoEmUmaLinhaDaListaParaAbrirODialogDeDetalhes("TesteA");

        When.naPaginaDeDetalheDeEquipamento.pressionandoBotaoDeletarNoDialogDeDetalhes();
        When.naPaginaDeListagemDeEquipamentos.pressionandoOBotaoCancelarNoDialogDeConfirmacaoDeDeletarParaFecharDialogDeConfirmacaoDeDeletar();

        When.naPaginaDeListagemDeEquipamentos.clicandoEmUmaLinhaDaListaParaAbrirODialogDeDetalhes("TesteB");
        When.naPaginaDeDetalheDeEquipamento.clicandoNoBotaoFecharDoDialogParaFecharAExibiçãoDosDetalhes();

		Then.iTeardownMyApp();
	});
});
