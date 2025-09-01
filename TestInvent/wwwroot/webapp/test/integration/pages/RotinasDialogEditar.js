sap.ui.define([
	"sap/ui/test/opaQunit",
	"./Lista",
	"./Detalhe",
	"./Adicionar",
    "./Editar",
], function (opaTest) {
	"use strict";

	QUnit.module("Dialog Formulario Editar equipamento.");

	opaTest("Rotinas de Edição de equipamento.", function (Given, When, Then) {
		Given.iStartMyApp();

        When.naPaginaDeListagemDeEquipamentos.pressionandoBotaoEditarLinha1ParaAbrirODialogDeEdição();
        Then.naPaginaDeEditarDeEquipamentos.verificandoSeODialogDeEditarEstaAberto();
        When.naPaginaDeEditarDeEquipamentos.clicandoNoInputNomeEInserindoUmaStringVazia("");
		When.naPaginaDeEditarDeEquipamentos.precionandoOBotaoSalvarParaSalvarOsDadosDoFormurarioDeEditar();
		Then.naPaginaDeEditarDeEquipamentos.verificandoSeOsCamposEstaoInformandoComAsMensagensDeValidacao();
		When.naPaginaDeEditarDeEquipamentos.clicandoNoInputDoNomeEInseridoUmNomeNoFormularioDeAdicionar("Acer");
		When.naPaginaDeEditarDeEquipamentos.precionandoOBotaoSalvarParaSalvarOsDadosDoFormurarioDeEditar();
        
		When.naPaginaDeListagemDeEquipamentos.clicandoEmUmaLinhaDaListaParaAbrirODialogDeDetalhes("Acer");
        Then.naPaginaDeDetalheDeEquipamento.verificandoSeODialogDeDetalhesEstaAberto();
        Then.naPaginaDeDetalheDeEquipamento.confirmandoSeItemAbertoCorrespondeAoSelecionado("Acer");
        When.naPaginaDeDetalheDeEquipamento.pressionandoBotaoEditarNoDialogDeDetalhes();
        Then.naPaginaDeEditarDeEquipamentos.verificandoSeODialogDeEditarEstaAberto();
        When.naPaginaDeEditarDeEquipamentos.clicandoNoInputNomeEInserindoUmaStringVazia("");
		When.naPaginaDeEditarDeEquipamentos.precionandoOBotaoSalvarParaSalvarOsDadosDoFormurarioDeEditar();
		Then.naPaginaDeEditarDeEquipamentos.verificandoSeOsCamposEstaoInformandoComAsMensagensDeValidacao();
		When.naPaginaDeEditarDeEquipamentos.clicandoNoInputDoNomeEInseridoUmNomeNoFormularioDeAdicionar("Samsung");
		When.naPaginaDeEditarDeEquipamentos.precionandoOBotaoSalvarParaSalvarOsDadosDoFormurarioDeEditar();

		Then.iTeardownMyApp();
	});
});
