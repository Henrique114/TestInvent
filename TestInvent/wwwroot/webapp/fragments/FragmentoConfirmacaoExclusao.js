sap.ui.define([
    "sap/m/Dialog", 
    "sap/m/Button", 
    "sap/m/MessageToast",
    "sap/m/Bar", 
    "sap/m/Title",
    "sap/ui/core/library", 
    "sap/m/Text"
    ], function(Dialog, Button, MessageToast, Bar, Title, TitleLevel, Text) {
    return {
        criarDialogDeConfirmação: function(controller, idEquipamento) {

            let dialogConfitmacaoDeletarEquipamento = new Dialog({
                    content: [
                        new Text({
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
                    customHeader: new Bar({
                        contentMiddle: [
                            new Title({
                                text: "Confirmar exclusão do equipamento",
                                level: TitleLevel.H1
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