sap.ui.define([
  "ui5/testinvent/localService/mockserver"
], function(mockserver) {
  "use strict";

  // inicializa o mockserver antes da aplicação UI5 carregar
  mockserver.init();

  // carregar componente UI5 depois do mock inicializar
  sap.ui.require(["sap/ui/core/ComponentSupport"]);
});
