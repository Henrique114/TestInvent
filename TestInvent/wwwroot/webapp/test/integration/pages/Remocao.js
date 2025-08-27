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
        noDialogDeConfirmacao: {
            actions: {
                clicandoEmConfirmar: function () {
                    return this.waitFor({
                        id: "btnConfirmarDelete",
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, "Botão Confirmar foi clicado com sucesso.");
                        },
                        errorMessage: "Botão Confirmar não foi encontrado no dialog de confirmação ao tentar deletar um equipamento"
                    });
                },
            },

            assertions: {
                dialogDeConfirmacaoAberto: function () {
                    return this.waitFor({
                        id: "idDialogDeConfirmacao",
                        success: function () {
                            Opa5.assert.ok(true, "dialog de confirmação foi aberta corretamente.");
                        },
                        errorMessage: "dialog de confirmação não abriu corretamente."
                    });
                }
            }
        }
    });
});
