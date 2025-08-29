sap.ui.define([
	"sap/ui/test/opaQunit",
	"./Lista",
	"./Detalhe",
	"./Adicionar",
    "./Editar",
    "./Remocao"
], function (opaTest) {
	"use strict";

	QUnit.module("Dialog confirmação Remoção equipamento.");

	opaTest("Rotinas de Remoção de equipamento.", function (Given, When, Then) {
		Given.iStartMyApp();

        
        When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoDeletarLinha1ParaAbrirODialogDeConfirmacaoDeDeletar();
        Then.noDialogDeConfirmacao.verificandoSeODialogDeConfirmacaoEstaAberto();
		When.naPaginaDeListagemDeEquipamentos.pressionandoOBotaoCancelarNoDialogDeConfirmacaoDeDeletarParaFecharDialogDeConfirmacaoDeDeletar();
        
        When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoDeletarLinha1ParaAbrirODialogDeConfirmacaoDeDeletar();
        Then.noDialogDeConfirmacao.verificandoSeODialogDeConfirmacaoEstaAberto();
		When.noDialogDeConfirmacao.pressionandoConfirmarNoDialogDeConfirmacaoParaConfirmarODelete();

        When.naPaginaDeListagemDeEquipamentos.conferindoAAberturaDoDialogpressionandoBotaoAdicionar();
        When.naPaginaDeAdicionarDeEquipamentos.clicandoNoInputDoNomeEInseridoUmNomeNoFormularioDeAdicionar("Asus");
        When.naPaginaDeAdicionarDeEquipamentos.clicandoNoSelectDoTipoESelecionandoUmTipoNoFormularioDeAdicionar("Monitor");
        When.naPaginaDeAdicionarDeEquipamentos.clicandoNoInputDoQuantidadeEInseridoUmNumeroNoFormularioDeAdicionar(3);
        When.naPaginaDeAdicionarDeEquipamentos.precionandoOBotaoSalvarParaSalvarOsDadosDoFormurarioDeAdicionar();
        
        When.naPaginaDeListagemDeEquipamentos.clicandoEmUmaLinhaDaListaParaAbrirODialogDeDetalhes("TesteA");
	    Then.naPaginaDeDetalheDeEquipamento.verificandoSeODialogDeDetalhesEstaAberto();
        Then.naPaginaDeDetalheDeEquipamento.confirmandoSeItemAbertoCorrespondeAoSelecionado("TesteA");
        When.naPaginaDeDetalheDeEquipamento.pressionandoBotaoDeletarNoDialogDeDetalhes();
        Then.noDialogDeConfirmacao.verificandoSeODialogDeConfirmacaoEstaAberto();
        When.naPaginaDeListagemDeEquipamentos.pressionandoOBotaoCancelarNoDialogDeConfirmacaoDeDeletarParaFecharDialogDeConfirmacaoDeDeletar();

        When.naPaginaDeListagemDeEquipamentos.clicandoEmUmaLinhaDaListaParaAbrirODialogDeDetalhes("TesteA");
	    Then.naPaginaDeDetalheDeEquipamento.verificandoSeODialogDeDetalhesEstaAberto();
        Then.naPaginaDeDetalheDeEquipamento.confirmandoSeItemAbertoCorrespondeAoSelecionado("TesteA");
        When.naPaginaDeDetalheDeEquipamento.pressionandoBotaoDeletarNoDialogDeDetalhes();
        Then.noDialogDeConfirmacao.verificandoSeODialogDeConfirmacaoEstaAberto();
        When.noDialogDeConfirmacao.pressionandoConfirmarNoDialogDeConfirmacaoParaConfirmarODelete();
		Then.iTeardownMyApp();
	});
});
