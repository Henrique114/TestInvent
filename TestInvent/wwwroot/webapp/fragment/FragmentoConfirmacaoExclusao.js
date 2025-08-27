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
            const i18n = controller.getView().getModel("i18n");
            const resourceBundle = i18n.getResourceBundle();
            

            controller.dialogConfirmacao = new Dialog({
                content: [
                    new Text({
                        text: resourceBundle.getText("msgconfirmarDelete") 
                    }).addStyleClass("sapUiSmallMargin"),
                ],
                id:"idDialogDeConfirmacao",
                state: 'Warning',
                endButton: new Button({
                    press: function () {
                        controller.dialogConfirmacao.destroy();
                    },
                    text: resourceBundle.getText("btnCancelar"),
                    id: "btnCancelarDelete" 
                }),
                beginButton: new Button({
                    press: () => {
                        controller.aoPressinarConfirmar(idEquipamento);
                        MessageToast.show(resourceBundle.getText("msgDeleteComSucesso")); 
                        controller.dialogConfirmacao.destroy();
                    },
                    text: resourceBundle.getText("btnConfirmar"), 
                    id: "btnConfirmarDelete" 
                }),
                customHeader: new Bar({
                    contentMiddle: [
                        new Title({
                            text: resourceBundle.getText("tituloDialogConfirmacao"), 
                            level: coreLibrary.TitleLevel.H1
                        })
                    ]
                }),
                contentHeight: "5%",
                contentWidth: "25%",
                verticalScrolling: false
            });
 
            return  controller.dialogConfirmacao ;
        }
    }
});
