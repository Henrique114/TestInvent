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

		Then.naPaginaDeListagemDeEquipamentos.telaListagemAberta();
		Then.naPaginaDeListagemDeEquipamentos.listaCarregadaComItems();

		When.naPaginaDeListagemDeEquipamentos.buscandoPorNome("TesteA");
		Then.naPaginaDeListagemDeEquipamentos.listaExibeOResultadoDaFiltragem("TesteA");

		When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoAdicionar();
		When.naPaginaDeAdicionarDeEquipamentos.fechandoDialogDeAdicionar();

		When.naPaginaDeListagemDeEquipamentos.clicandoNoItemEAbrindoTelaDeDetalhes("TesteA");
		When.naPaginaDeDetalheDeEquipamento.fechandoDialogDeDetalhes();

        When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoEditarLinha1();
		When.naPaginaDeEditarDeEquipamentos.fechandoDialogDeEditar();

		When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoDeletarLinha1();
		When.naPaginaDeListagemDeEquipamentos.cancelandoNaConfirmacaoDeDeletar();

		Then.iTeardownMyApp();
	});
});
