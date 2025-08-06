sap.ui.define(["sap/ui/core/Fragment"], function(Fragment) {
    return {

        criarDialogo: function(view) {
            return Fragment.load({
                id: view.getId(),
                name: "ui5.testinvent.view.DetalhesEquipamento",
                controller: this
            }).then((dialog) => {
                dialog.setModel(); // você pode passar o modelo necessário como argumento, se desejar
                this.getOwnerComponent().getModel("i18n").getResourceBundle();   
                view.addDependent(dialog);
                this.oDialog = dialog;
                return dialog;
            });
        },
        AoAbrirTelaDeDetalhes: function() {
           var view = this.getView();

            if (!this.byId("idDialog")) {
                this.criarDialogo(view)
                .then((dialog) => {
                    dialog.open();
                });
            } else {
                this.byId("idDialog").open();
            }
        },

        aoPrecionarFechar: function(evento) {
            this.oDialog.close();
        }

       
    } 
});