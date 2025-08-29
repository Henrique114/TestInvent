 sap.ui.define([
     "sap/m/Dialog",
     "sap/m/Button",
     "sap/m/MessageToast",
     "sap/m/Bar",
     "sap/m/Title",
     "sap/ui/core/library",
     "sap/m/Text"
     ], function(Dialog, Button, MessageToast, Bar, Title, coreLibrary, Text) {
        const idDialogDeConfirmacao = "idDialogDeConfirmacao";
        const idBotaoConfirmar = "btnConfirmarDelete";
        const idBotaoCancelar = "btnCancelarDelete";
        const txtTitulo = "tituloDialogConfirmacao";
        const txtMensagem = "msgconfirmarDelete";
        const mensagemDeSucesso = "msgDeleteComSucesso";
        const txtBotaoConfirmar = "btnConfirmar";
        const txtBotaoCancelar = "btnCancelar";
        const nomeClassEstiloDoConteudo = "sapUiSmallMargin";
        const stadoDoDialog = 'Warning';
        const modeli18n = "i18n";
     return {
        criarDialogDeConfirmação: function(controller, idEquipamento) {
            const i18n = controller.getView().getModel(modeli18n);
            const resourceBundle = i18n.getResourceBundle();
            
            controller.dialogConfirmacao = new Dialog({
                content: [
                    new Text({
                        text: resourceBundle.getText(txtMensagem) 
                    }).addStyleClass(nomeClassEstiloDoConteudo),
                ],
                id:idDialogDeConfirmacao,
                state: stadoDoDialog,
                endButton: new Button({
                    press: function () {
                        controller.dialogConfirmacao.destroy();
                    },
                    text: resourceBundle.getText(txtBotaoCancelar),
                    id:  idBotaoCancelar
                }),
                beginButton: new Button({
                    press: () => {
                        controller.aoPressinarConfirmar(idEquipamento);
                        MessageToast.show(resourceBundle.getText(mensagemDeSucesso)); 
                        controller.dialogConfirmacao.destroy();
                    },
                    text: resourceBundle.getText(txtBotaoConfirmar), 
                    id:  idBotaoConfirmar
                }),
                customHeader: new Bar({
                    contentMiddle: [
                        new Title({
                            text: resourceBundle.getText(txtTitulo), 
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
