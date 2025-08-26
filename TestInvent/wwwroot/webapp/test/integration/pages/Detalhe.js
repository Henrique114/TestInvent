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
                euClicoEmRemover: function () {
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "text",
                            key: "botaoRemover"
                        }),
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão 'Remover' clicado com sucesso.");
                        },
                        errorMessage: "Não encontrei o botão 'Remover'."
                    });
                },
                euClicoEmEditar: function () {
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "text",
                            key: "botaoEditar"
                        }),
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão 'Editar' clicado com sucesso.");
                        },
                        errorMessage: "Não encontrei o botão 'Editar'."

                    });
                },
                euConfirmoRemocao: function () {
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

                euNaoConfirmoRemocao: function () {
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        searchOpenDialogs: true,
                        matchers: new I18NText({
                            propertyName: "text",
                            key: "botaoCancelar"
                        }),
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Confirmou a não remoção do equipamento.");
                        },
                        errorMessage: "Não foi possível localizar a opção para negar a remoção."
                    });
                }
            },
            assertions: {
                paginaDeDetalheAberta: function () {
                    return this.waitFor({
                        controlType: "sap.m.Page",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "title",
                            key: "tituloPaginaDetalhes"
                        }),
                        success: function () {
                            Opa5.assert.ok(true, "Página de detalhes foi aberta corretamente.");
                        },
                        errorMessage: "Página de detalhes não abriu corretamente."
                    });
                }
            }
        }
    });
});