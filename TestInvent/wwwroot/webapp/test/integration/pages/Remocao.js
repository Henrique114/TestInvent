sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press",
], function (Opa5, Press) {
    "use strict";
    const VIEW_NAME = "ListagemEquipamentos";

    Opa5.createPageObjects({
        noDialogDeConfirmacao: {
            actions: {
                pressionandoConfirmarNoDialogDeConfirmacaoParaConfirmarODelete: function () {
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
                verificandoSeODialogDeConfirmacaoEstaAberto: function () {
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
