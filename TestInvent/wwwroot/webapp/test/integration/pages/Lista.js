sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/matchers/AggregationLengthEquals",
    "sap/ui/test/matchers/I18NText",
    "sap/ui/test/matchers/BindingPath",
    "sap/ui/test/actions/Press",
    "sap/ui/test/actions/EnterText",
    "sap/ui/test/matchers/PropertyStrictEquals"
], function (Opa5, AggregationLengthEquals, I18NText, BindingPath, Press, EnterText, PropertyStrictEquals) {
    "use strict";

    const VIEW_NAME = "ListagemEquipamentos";
    const QUANTIDADE_INICIAL = 4;
    const MODELO_EQUIPAMENTOS = "equipamentos";
    const QUANTIDADE_MINIMA_ESPERADA = 2;

    Opa5.createPageObjects({
        naPaginaDeListagemDeEquipamentos: {
            actions: {
                pressionandoBotaoAdicionar: function () {
                    return this.waitFor({
                        id: "btnAdicionarEquipamento",
                        viewName: VIEW_NAME,
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão Cadastrar foi clicado com sucesso.");
                        },
                        errorMessage: "Botão Cadastrar não foi encontrado na página de lista."
                    });
                },
                pressionandoBotaoEditarLinha1: function () {
                    return this.waitFor({
                        id: "btnEditarLinhaListaEquipamento-__xmlview0--listaEquipamentos-0",
                        viewName: VIEW_NAME,
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão Cadastrar foi clicado com sucesso.");
                        },
                        errorMessage: "Botão Cadastrar não foi encontrado na página de lista."
                    });
                },
                pressionandoBotaoDeletarLinha1: function () {
                    return this.waitFor({
                        id: "btnDeletarLinhaListaEquipamento-__xmlview0--listaEquipamentos-0",
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
                        id: "__button0",
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão Cancelar no Dialog de confirmacao foi clicado com sucesso.");
                        },
                        errorMessage: "Botão Cancelar no Dialog de confirmacao não foi encontrado."
                    });
                },

                buscandoPorNome: function (nome) {
                    return this.waitFor({
                        id: "inputFiltro",
                        viewName: VIEW_NAME,
                        actions: new EnterText({ text: nome }),
                        success: function () {
                            Opa5.assert.ok(true, `Busca realizada com: ${nome}.`);
                        },
                        errorMessage: "Campo de busca não encontrado."
                    });
                },

                clicandoNoItemEAbrindoTelaDeDetalhes: function (nome) {
                    return this.waitFor({
                        controlType: "sap.m.Text",
                        matchers: new PropertyStrictEquals({
                            name: "text",
                            value: nome
                        }),
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, `Item com o nome ${nome} clicado.`);
                        },
                        errorMessage: `Item com o nome ${nome} não foi encontrado na tela.`
                    });
                }
            },

            assertions: {
                telaListagemAberta: function () {
                    return this.waitFor({
                        controlType: "sap.m.Table",
                        viewName: "ListagemEquipamentos",
                        matchers: [
                        new I18NText({
                        propertyName: "headerText",
                        key: "listPageTitle"
                        })
                    ],
                        success: function () {
                            Opa5.assert.ok(true, "Página de lista aberta.");
                        },
                        errorMessage: "Página de lista não abriu."
                    });
                },

                listaCarregadaComItems: function () {
                    return this.waitFor({
                        controlType: "sap.m.Table",
                        viewName: VIEW_NAME,
                        matchers: [new AggregationLengthEquals({
                            name: "items",
                            length: QUANTIDADE_INICIAL

                            
                        }),
                        
                         function (oPage) {
                    debugger; 
                    
                    return true;
                    },
                    
                    ],
                        success: function () {
                            Opa5.assert.ok(true, `Tabela contém ${QUANTIDADE_INICIAL} objetos.`);
                        },
                        errorMessage: "Quantidade de itens incorreta."
                    });
                },

                listaExibeOResultadoDaFiltragem: function (nome) {
                    return this.waitFor({
                        controlType: "sap.m.Text",
                        viewName: VIEW_NAME,
                        matchers: new PropertyStrictEquals({
                            name: "text",
                            value: nome
                        }),
                        success: function () {
                            Opa5.assert.ok(true, `Encontrado item "${nome}".`);
                        },
                        errorMessage: `Item "${nome}" não apareceu na tabela.`
                    });
                },
                tabelaVazia: function () {
                    return this.waitFor({
                        controlType: "sap.m.Table",
                        viewName: VIEW_NAME,
                        matchers: new AggregationLengthEquals({
                            name: "items",
                            length: 0
                        }),
                        success: () => Opa5.assert.ok(true, "Tabela vazia"),
                        errorMessage: "Tabela não está vazia"
                    });
                }
            }
        }
    });
});
