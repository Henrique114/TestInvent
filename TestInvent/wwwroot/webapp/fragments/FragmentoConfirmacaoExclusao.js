sap.ui.define([
    "sap/m/Dialog", 
    "sap/m/Button", 
    "sap/m/MessageToast",
    "sap/m/Bar", 
    "sap/m/Title",
    "sap/ui/core/library", 
    "sap/m/Text"
    ], function(Dialog, Button, MessageToast, Bar, Title, coreLibrary, Text) {
    return {
        criarDialogDeConfirmação: function(controller, idEquipamento) {
            let confirmacao = false;
            let confirmacaoDeletar = new Dialog({
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
                            confirmacao = true;
                                
                            MessageToast.show("Equipamento deletado!");
                                
                            confirmacaoDeletar.close();
                        },
                        text: "Confirmar"
                    }),
                    customHeader: new Bar({
                        contentMiddle: [
                            new Title({
                                text: "Confirmar exclusão do equipamento",
                                level: coreLibrary.TitleLevel.H1
                            })
                        ]
                    }),
                    contentHeight: "10%",
                    contentWidth: "25%",
                    verticalScrolling: false
                });
            return {confirmacaoDeletar, confirmacao};
        }
    }
});