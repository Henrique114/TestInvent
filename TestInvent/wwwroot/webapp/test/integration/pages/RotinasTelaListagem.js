sap.ui.define([
	"sap/ui/test/opaQunit",
	"./Lista",
	"./Detalhe",
	"./Adicionar"
	
], function (opaTest) {
	"use strict";

	QUnit.module("Tela Listagem de Equipamento");

	opaTest("Fluxo de listagem completo", function (Given, When, Then) {
		Given.iStartMyApp();

		Then.naPaginaDeListagemDeEquipamentos.telaListagemAberta();
		Then.naPaginaDeListagemDeEquipamentos.listaCarregadaComItems();

		When.naPaginaDeListagemDeEquipamentos.buscandoPorNome("TesteA");
		Then.naPaginaDeListagemDeEquipamentos.listaExibeOResultadoDaFiltragem("TesteA");

		When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoAdicionar();
		When.naPaginaDeAdicionarDeEquipamentos.fechandoDialogDeAdicionar();

		When.naPaginaDeListagemDeEquipamentos.clicandoNoItemEAbrindoTelaDeDetalhes("TesteA");
		When.naPaginaDeDetalheDeEquipamento.fechandoDialogDeDetalhes();

        When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoEditarLinha1();
		When.naPaginaDeAdicionarDeEquipamentos.fechandoDialogDeAdicionar();

		When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoDeletarLinha1();
		When.naPaginaDeListagemDeEquipamentos.cancelandoNaConfirmacaoDeDeletar();





		

		Then.iTeardownMyApp();
	});
});
