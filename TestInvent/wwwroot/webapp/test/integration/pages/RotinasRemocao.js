sap.ui.define([
	"sap/ui/test/opaQunit",
	"./Lista",
	"./Detalhe",
	"./Cadastro",
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
        When.naPaginaDeCadastroDeEquipamentos.preenchendoNome("Asus");
        When.naPaginaDeCadastroDeEquipamentos.preenchendoTipo();
        When.naPaginaDeCadastroDeEquipamentos.preenchendoQuantidade(3);
        When.naPaginaDeCadastroDeEquipamentos.clicandoEmSalvar();
        
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
