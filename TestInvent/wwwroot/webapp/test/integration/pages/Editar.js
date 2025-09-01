sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/matchers/I18NText",
    "sap/ui/test/actions/EnterText",
    "sap/ui/test/actions/Press",
    "sap/ui/test/matchers/PropertyStrictEquals",
], function (Opa5, I18NText, EnterText, Press, PropertyStrictEquals) {
    "use strict";
    const VIEW_NAME = "ListagemEquipamentos";

    Opa5.createPageObjects({
        naPaginaDeEditarDeEquipamentos: {
            actions: {
                pressionandoOBotaoCancelarNoDialogDeEdicaoParaFecharDialogDeEditar: function () {
                    return this.waitFor({
                        id: "btnCancelarTelaCadastroEdicao",
                        viewName: VIEW_NAME,
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Cliquei em Fechar Dialog de Editar equipamento.");
                        },
                        errorMessage: "Não encontrei o botão Fechar Dialog de Editar equipamento."
                    });
                },
                clicandoNoInputNomeEInserindoUmaStringVazia: function (nome) {
                    return this.waitFor({
                        controlType: "sap.m.Input",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "placeholder",
                            key: "preencherNome"
                        }),
                        actions: new EnterText({ text: nome }),
                        success: function () {
                            Opa5.assert.ok(true, "Limpei o campo nome");
                        },
                        errorMessage: "Não encontrei o campo Nome na página de Editar."
                    });
                },
                clicandoNoInputDoNomeEInseridoUmNomeNoFormularioDeAdicionar: function (nome) {
                    return this.waitFor({
                        controlType: "sap.m.Input",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "placeholder",
                            key: "preencherNome"
                        }),
                        actions: new EnterText({ text: nome }),
                        success: function () {
                            Opa5.assert.ok(true, "Preenchi o nome com: " + nome);
                        },
                        errorMessage: "Não encontrei o campo Nome na página de Editar."
                    });
                },
                clicandoNoSelectDoTipoESelecionandoUmTipoNoFormularioDeAdicionar: function () {
                    return this.waitFor({
                        id: "formulariotipo",
                        viewName: VIEW_NAME,
                        actions: new Press(),
                        success: function() {
                            this.waitFor({
                                id: "idItem-__xmlview0--formulariotipo-0",
                                actions: new Press(),
                                viewName: VIEW_NAME,
                                success: function() {
                                   Opa5.assert.ok(true, "Primeiro item foi clicado com sucesso.");
                                },
                                errorMessage: "Não consegui selecionar o primeiro item no select."
                            });
                        },
                        errorMessage: "Não consegui encontrar o Select"
                    });
                },
                clicandoNoInputDoQuantidadeEInseridoUmNumeroNoFormularioDeAdicionar: function (quantidade) {
                    return this.waitFor({
                        controlType: "sap.m.Input",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "placeholder",
                            key: "preencherQuantidade"
                        }),
                        matchers: new PropertyStrictEquals({
                            name: "type",
                            value: "Number",
                        }),
                        actions: new EnterText({ text: quantidade }),
                        success: function () {
                            Opa5.assert.ok(true, "Preenchi a quantidade com: " + quantidade);
                        },
                        errorMessage: "Não encontrei o campo Quantidade na página de Editar."
                    });
                },
                precionandoOBotaoSalvarParaSalvarOsDadosDoFormurarioDeEditar: function () {
                    return this.waitFor({
                         id: "btnSalvarTelaCadastro",
                        viewName: VIEW_NAME,
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão Salvar foi clicado com sucesso.");
                        },
                        errorMessage: "Botão Salvar não foi encontrado na página de Editar."
                    });
                },
            },
            assertions: {
                verificandoSeODialogDeEditarEstaAberto: function () {
                    return this.waitFor({
                        id: "idAdicionarEditar",
                        viewName: VIEW_NAME,
                        success: function () {
                            Opa5.assert.ok(true, "dialog de Editar foi aberta corretamente.");
                        },
                        errorMessage: "dialog de Editar não abriu corretamente."
                    });
                },
                verificandoSeOsCamposEstaoInformandoComAsMensagensDeValidacao: function () {
                    return this.waitFor({
                        controlType: "sap.m.Input",
                        viewName: VIEW_NAME,
                        matchers: new PropertyStrictEquals({
                            name: "valueState",
                            value: "Error"
                        }),
                        success: function () {
                            Opa5.assert.ok(true, "Campo Nome está em Error state.");
                        },
                        errorMessage: "Campo Nome não apresentou erro."
                    });
                },
                tipoComErroDeValidacao: function () {
                    return this.waitFor({
                        controlType: "sap.m.Input",
                        viewName: VIEW_NAME,
                        matchers: new PropertyStrictEquals({
                            name: "valueState",
                            value: "Error"
                        }),
                        success: function () {
                            Opa5.assert.ok(true, "Campo Tipo está em Error state.");
                        },
                        errorMessage: "Campo Tipo não apresentou erro."
                    });
                },
                quantidadeComErroDeValidacao: function () {
                    return this.waitFor({
                        controlType: "sap.m.Input",
                        viewName: VIEW_NAME,
                        matchers: new PropertyStrictEquals({
                            name: "valueState",
                            value: "Error"
                        }),
                        success: function () {
                            Opa5.assert.ok(true, "Campo Quantidade está em Error state.");
                        },
                        errorMessage: "Campo Quantidade não apresentou erro."
                    });
                }
            }
        }
    });
});
