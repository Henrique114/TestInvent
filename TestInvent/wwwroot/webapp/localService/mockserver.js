sap.ui.define([
	"sap/ui/core/util/MockServer"
], (MockServer) => {
	"use strict";
	//const ENDPOINT_BASE = "/EquipamentoEletronico";
	return {
		init() {
			debugger;
			// create
			const oMockServer = new MockServer({
				rootUri: sap.ui.require.toUrl("ui5/testinvent") //+ ENDPOINT_BASE 
			});

			const oUrlParams = new URLSearchParams(window.location.search);

			// configure mock server with a delay
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: oUrlParams.get("serverDelay") || 500
			});

			// simulate
			const sPath = sap.ui.require.toUrl("ui5/testinvent/localService");
			oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

			// start
			oMockServer.start();
		}
	};
});
