sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/opaQunit",
    "ui5/testinvent/test/integration/Startup",
    "ui5/testinvent/test/integration/pages/RotinasTelaListagem",
    "ui5/testinvent/test/integration/pages/RotinasDialogDetalhes",
    "ui5/testinvent/test/integration/pages/RotinasDialogAdicionar",
    "ui5/testinvent/test/integration/pages/RotinasDialogEditar",
    "ui5/testinvent/test/integration/pages/RotinasRemocao",
], (Opa5, opaTest, Startup) => {
    "use strict";

    Opa5.extendConfig({
        arrangements: new Startup(),
        viewNamespace: "ui5.testinvent.view.",
        autoWait: true
    });
});