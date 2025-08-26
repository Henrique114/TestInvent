sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/matchers/I18NText",
    "sap/ui/test/matchers/PropertyStrictEquals",
    "sap/ui/test/actions/Press"
], function (Opa5, I18NText, PropertyStrictEquals, Press) {
    "use strict";

    const VIEW_NAME = "ListagemEquipamentos";

    Opa5.createPageObjects({
        naPaginaDeDetalheDeEquipamento: {
            actions: {
                fechandoDialogDeDetalhes: function () {
                    return this.waitFor({
                        id: "btnFechar",
                        viewName: VIEW_NAME,
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Cliquei em Fechar tela de detalhes.");
                        },
                        errorMessage: "Não encontrei o botão Fechar tela de detalhes."
                    });
                },
                 pressionandoBotaoEditarEmDetalhes: function () {
                    return this.waitFor({
                        id: "btnEditarEquipamentoPgDetalhes",
                        viewName: VIEW_NAME,
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão Cadastrar foi clicado com sucesso.");
                        },
                        errorMessage: "Botão Cadastrar não foi encontrado na página de lista."
                    });
                },
                pressionandoBotaoDeletarEmDetalhes: function () {
                    return this.waitFor({
                        id: "btnDeletarDetalhesEquipamento",
                        viewName: VIEW_NAME,
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão Deletar foi clicado com sucesso.");
                        },
                        errorMessage: "Botão Deletar não foi encontrado no Dialog."
                    });
                },
                cancelandoNaConfirmacaoDeDeletar: function () {
                    return this.waitFor({
                        id: "btnCancelarDelete",
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão Cancelar foi clicado com sucesso no Dialog de confirmacao.");
                        },
                        errorMessage: "Botão Cancelar não foi encontrado no Dialog de confirmacao ."
                    });
                },
                confirmandoRemocao: function () {
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        searchOpenDialogs: true,
                        matchers: new I18NText({
                            propertyName: "text",
                            key: "botaoRemover"
                        }),
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Confirmou remoção do equipamento.");
                        },
                        errorMessage: "Não foi possível localizar a opção para confirmar a remoção."
                    });
                },

               
            },
            assertions: {
                dialogDeDetalhesFoiAberto: function () {
                    return this.waitFor({
                        id: "idDialogDetalhes",
                        viewName: VIEW_NAME,
                        success: function () {
                            Opa5.assert.ok(true, "Página de detalhes foi aberta corretamente.");
                        },
                        errorMessage: "Página de detalhes não abriu corretamente."
                    });
                },
                confirmaSeItemAbertoCorrespondeAoSelecionado: function(nome){
                    return this.waitFor({
                        controlType: "sap.m.Title",
                        matchers: new PropertyStrictEquals({
                            name: "text",
                            value: nome
                        }),
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, `O nome: ${nome} corresponde ao item selecinado na lista.`);
                        },
                        errorMessage: `O nome: ${nome} não não corresponde ao selecionado em tela.`
                    });
                }
            }
        }
    });
});