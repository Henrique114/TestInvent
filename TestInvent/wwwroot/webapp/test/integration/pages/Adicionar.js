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
        naPaginaDeAdicionarDeEquipamentos: {
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
                        errorMessage: "Não encontrei o campo Nome na página de Adicionar."
                    });
                },
               preenchendoTipo: function (tipo) {
                    return this.waitFor({
                        id: "formulariotipo",
                        viewName: VIEW_NAME,
                        actions: new Press(), 
                        success: function () {
                            this.waitFor({
                                controlType: "sap.ui.core.Item", 
                                matchers: new sap.ui.test.matchers.PropertyStrictEquals({
                                    name: "text", 
                                    value: tipo
                                }),
                                actions: new Press(), 
                                success: function () {
                                    Opa5.assert.ok(true, "Item '" + tipo + "' selecionado e selectedKey atualizado.");
                                },
                                errorMessage: "Não consegui selecionar o item '" + tipo + "' no Select."
                            });
                        },
                        errorMessage: "Não consegui abrir o Select."
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
                        errorMessage: "Não encontrei o campo Quantidade na página de Adicionar."
                    });
                },
                clicandoEmSalvar: function () {
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        viewName: VIEW_NAME,
                        matchers: new I18NText({
                            propertyName: "text",
                            key: "btnSalvar"
                        }),
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão Salvar foi clicado com sucesso.");
                        },
                        errorMessage: "Botão Salvar não foi encontrado na página de Adicionar."
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
                            Opa5.assert.ok(true, "Página de Adicionar foi aberta corretamente.");
                        },
                        errorMessage: "Página de Adicionar não abriu corretamente."
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
