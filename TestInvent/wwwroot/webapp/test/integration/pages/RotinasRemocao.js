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

        
        When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoDeletarLinha1();
        Then.noDialogDeConfirmacao.dialogDeConfirmacaoAberto();
		When.naPaginaDeListagemDeEquipamentos.cancelandoNaConfirmacaoDeDeletar();
        
        When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoDeletarLinha1();
        Then.noDialogDeConfirmacao.dialogDeConfirmacaoAberto();
		When.noDialogDeConfirmacao.clicandoEmConfirmar();

        When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoAdicionar();
        When.naPaginaDeAdicionarDeEquipamentos.preenchendoNome("Asus");
        When.naPaginaDeAdicionarDeEquipamentos.preenchendoTipo("Monitor");
        When.naPaginaDeAdicionarDeEquipamentos.preenchendoQuantidade(3);
        When.naPaginaDeAdicionarDeEquipamentos.clicandoEmSalvar();
        
        When.naPaginaDeListagemDeEquipamentos.clicandoNoItemEAbrindoTelaDeDetalhes("TesteA");
	    Then.naPaginaDeDetalheDeEquipamento.dialogDeDetalhesFoiAberto();
        Then.naPaginaDeDetalheDeEquipamento.confirmaSeItemAbertoCorrespondeAoSelecionado("TesteA");
        When.naPaginaDeDetalheDeEquipamento.pressionandoBotaoDeletarEmDetalhes();
        Then.noDialogDeConfirmacao.dialogDeConfirmacaoAberto();
        When.naPaginaDeListagemDeEquipamentos.cancelandoNaConfirmacaoDeDeletar();

        When.naPaginaDeListagemDeEquipamentos.clicandoNoItemEAbrindoTelaDeDetalhes("TesteA");
	    Then.naPaginaDeDetalheDeEquipamento.dialogDeDetalhesFoiAberto();
        Then.naPaginaDeDetalheDeEquipamento.confirmaSeItemAbertoCorrespondeAoSelecionado("TesteA");
        When.naPaginaDeDetalheDeEquipamento.pressionandoBotaoDeletarEmDetalhes();
        Then.noDialogDeConfirmacao.dialogDeConfirmacaoAberto();
        When.noDialogDeConfirmacao.clicandoEmConfirmar();
		Then.iTeardownMyApp();
	});
});
