sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/matchers/I18NText",
    "sap/ui/test/actions/EnterText",
    "sap/ui/test/actions/Press",
    "sap/ui/test/matchers/PropertyStrictEquals",
    "sap/m/MessageBox"
], function (Opa5, I18NText, EnterText, Press, PropertyStrictEquals, MessageBox) {
    "use strict";

    const VIEW_NAME = "ListagemEquipamentos";
    

    Opa5.createPageObjects({
        naPaginaDeCadastroDeEquipamentos: {
            actions: {

                fechandoDialogDeAdicionar: function () {
                    return this.waitFor({
                        id: "btnCancelarTelaCadastroEdicao",
                        viewName: VIEW_NAME,
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Cliquei em Fechar Dialog de Adicionar equipamento.");
                        },
                        errorMessage: "Não encontrei o botão Fechar Dialog de Adicionar equipamento."
                    });
                },
                preenchendoNome: function (nome) {
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
                        errorMessage: "Não encontrei o campo Nome na página de cadastro."
                    });
                },
                preenchendoTipo: function () {
                    return this.waitFor({
                        id: "formulariotipo",
                        viewName: VIEW_NAME,
                        actions: new Press(),
                        success: function() {
                            this.waitFor({
                                id: "idItem-listagemView--formulariotipo-1",
                                actions: new Press(),
                                viewName: VIEW_NAME,
                                success: function() {
                                   Opa5.assert.ok(true, "Segundo item foi clicado com sucesso.");
                                },
                                errorMessage: "Não consegui selecionar o segundo item no select."
                            });
                        },
                        errorMessage: "Não consegui encontrar o Select"
                    });
                },
                preenchendoQuantidade: function (quantidade) {
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
                        errorMessage: "Não encontrei o campo Quantidade na página de cadastro."
                    });
                },
                clicandoEmSalvar: function () {
                    return this.waitFor({
                         id: "btnSalvarTelaCadastro",
                        viewName: VIEW_NAME,
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão Salvar foi clicado com sucesso.");
                        },
                        errorMessage: "Botão Salvar não foi encontrado na página de cadastro."
                    });
                },
            },

            assertions: {
                dialogDeAdicionarAberto: function () {
                    return this.waitFor({
                        controlType: "sap.m.Page",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "title",
                            key: "tituloPaginaCadastro"
                        }),
                        success: function () {
                            Opa5.assert.ok(true, "Página de cadastro foi aberta corretamente.");
                        },
                        errorMessage: "Página de cadastro não abriu corretamente."
                    });
                },

                nomeComErroDeValidacao: function () {
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
