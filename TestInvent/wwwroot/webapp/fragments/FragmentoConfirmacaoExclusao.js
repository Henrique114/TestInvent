sap.ui.define(["sap/m/Dialog", "sap/m/Button"], function(Dialog, Button) {
    return {
        criarDialogDeConfirmação: function(controller, idEquipamento) {

            let dialogConfitmacaoDeletarEquipamento = new Dialog({
                    content: [
                        new sap.m.Text({
                            text: "Tem certeza que deseja apagar este equipamento?"
                        })
                    ],
                    state: 'Warning',
                    beginButton: new Button({
                        press: function () {
                            this.getParent().close();
                        },
                        text: "Close"
                    }),
                    endButton: new Button({
                        press: () => {
                            controller._deletarEquipamento(idEquipamento)
                                .then(() => {
                                    controller._obterDadosEquipamentos();
                                    MessageToast.show("Equipamento deletado!");
                                });
                            dialogConfitmacaoDeletarEquipamento.close();
                        },
                        text: "Confirmar"
                    }),
                    customHeader: new sap.m.Bar({
                        contentMiddle: [
                            new sap.m.Title({
                                text: "Confirmar exclusão do equipamento",
                                level: sap.ui.core.TitleLevel.H1
                            })
                        ]
                    }),
                    contentHeight: "10%",
                    contentWidth: "25%",
                    verticalScrolling: false
                });
            return dialogConfitmacaoDeletarEquipamento;
        }
    }
});