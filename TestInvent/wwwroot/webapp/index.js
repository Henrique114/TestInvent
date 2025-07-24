sap.ui.define([
	"sap/ui/core/ComponentContainer"
], (ComponentContainer) => {
	"use strict";

	new ComponentContainer({
		name: "ui5.testinvent",
		settings : {
			id : "testinvent"
		},
		async: true
	}).placeAt("content");
});