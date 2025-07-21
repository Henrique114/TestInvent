sap.ui.define([], () => {
	"use strict";

	return {
		statusText(sStatus) {
			const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			switch (sStatus) {
				case "A":
					return oResourceBundle.getText("");
				case "B":
					return oResourceBundle.getText("");
				case "C":
					return oResourceBundle.getText("");
				default:
					return sStatus;
			}
		}
	};
});