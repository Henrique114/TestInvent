sap.ui.define([
   "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/model/odata/v2/ODataModel"
], (UIComponent, JSONModel, Device, ODataModel) => {
   "use strict";

   return UIComponent.extend("ui5.testinvent.Component", {

		metadata : {
			interfaces: ["sap.ui.core.IAsyncContentCreation"],
			manifest: "json"
		},

		init() {
			UIComponent.prototype.init.apply(this, arguments);

			const modeloDoDispositivo = new JSONModel(Device);
			modeloDoDispositivo.setDefaultBindingMode("OneWay");
			this.setModel(modeloDoDispositivo, "device");

			// Cria o modelo OData apontando para o mock
			var oModel = new ODataModel("/odata/", {
				useBatch: false
			});

			this.setModel(oModel);

			this.getRouter().initialize();
			
		},
		
		getContentDensityClass() {
			return Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";
		}
   });
});