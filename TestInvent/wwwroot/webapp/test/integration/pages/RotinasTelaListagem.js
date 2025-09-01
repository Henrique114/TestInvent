sap.ui.define([
	"sap/ui/test/opaQunit",
	"./Lista",
	"./Detalhe",
	"./Adicionar",
	"./Editar"
], function (opaTest) {
	"use strict";

	QUnit.module("Tela Listagem de Equipamento");

	opaTest("Rotinas de listagem de equipamentos", function (Given, When, Then) {
		Given.iStartMyApp();

		Then.naPaginaDeListagemDeEquipamentos.AcessaandoAListaEConferindoSeFoiAberta();
		Then.naPaginaDeListagemDeEquipamentos.conferindoSeAQuantidadeDeItensListadosEhAEsperada();

		When.naPaginaDeListagemDeEquipamentos.identificandoOCampoPesquisaEFazendoUmaBuscaPorNome("TesteA");
		Then.naPaginaDeListagemDeEquipamentos.conferindoOResultadoDaBuscaPorNome("TesteA");

		When.naPaginaDeListagemDeEquipamentos.conferindoAAberturaDoDialogpressionandoBotaoAdicionar();
		When.naPaginaDeAdicionarDeEquipamentos.conferindoOFechamentoDoDialogDeAdicionarPressionandoFechar();

		When.naPaginaDeListagemDeEquipamentos.clicandoEmUmaLinhaDaListaParaAbrirODialogDeDetalhes("TesteA");
		When.naPaginaDeDetalheDeEquipamento.clicandoNoBotaoFecharDoDialogParaFecharAExibiçãoDosDetalhes();

        When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoEditarLinha1ParaAbrirODialogDeEdição();
		When.naPaginaDeEditarDeEquipamentos.pressionandoOBotaoCancelarNoDialogDeEdicaoParaFecharDialogDeEditar();

		When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoDeletarLinha1ParaAbrirODialogDeConfirmacaoDeDeletar();
		When.naPaginaDeListagemDeEquipamentos.pressionandoOBotaoCancelarNoDialogDeConfirmacaoDeDeletarParaFecharDialogDeConfirmacaoDeDeletar();

		Then.iTeardownMyApp();
	});
});
