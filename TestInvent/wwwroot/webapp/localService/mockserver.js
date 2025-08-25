sap.ui.define([
  "sap/ui/core/util/MockServer",
  "sap/ui/thirdparty/jquery"
], function(MockServer, jQuery) {
  "use strict";

  return {
	
    init: function() {
      const oMockServer = new MockServer({
        rootUri: "/odata/"
      });

	  debugger;
      // Configurar resposta automática com delay
      MockServer.config({
        autoRespond: true,
        autoRespondAfter: 500
      });

      // Simular serviço OData a partir do metadata e mockdata
      const sPath = sap.ui.require.toUrl("ui5/testinvent/localService");
      oMockServer.simulate(sPath + "/metadata.xml", {
        sMockdataBaseUrl: sPath + "/mockdata",
        bGenerateMissingMockData: true
      });

      // Iniciar mock server
      oMockServer.start();

      return oMockServer;
    }
  };
});
