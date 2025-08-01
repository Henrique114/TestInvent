// sap.ui.define([
// 	"sap/ui/core/mvc/Controller",
// 	"sap/ui/core/routing/History",
// 	"sap/m/MessageToast",
// 	"sap/ui/model/json/JSONModel"
// ], (Controller, History, MessageToast, JSONModel) => {
// 	"use strict";
//     const ROTA = this.getOwnerComponent().getRouter();
// 	return Controller.extend("ui5.testinvent.controller.DetalhesEquipamento", {
// 		onInit() {
			

			
// 			ROTA.getRoute("DetalhesEquipamento").attachPatternMatched(this.onObjectMatched, this);
// 		},
//         _obterEquipamentoPorId: function () {
            
//             let urlRequisicaoEquipamentos = `${ENDPOINT_BASE}${nome ? "?filtro=" + encodeURIComponent(nome) : ""}`;

//             fetch(urlRequisicaoEquipamentos)
//                 .then(response => response.json())
//                 .then(dados => {
//                     dados.forEach(element => {
//                         element.dataDeInclusao = new Date(element.dataDeInclusao);
//                     });

//                     this._setarModeloEquipamentos(dados);
//                     const oModel = new JSONModel(dados);
//                     this.getView().setModel(oModel, MODELO_EQUIPAMENTOS);
//                 })
                
//         },

// 		onNavBack() {
// 			const oHistory = History.getInstance();
// 			const sPreviousHash = oHistory.getPreviousHash();

// 			if (sPreviousHash !== undefined) {
// 				window.history.go(-1);
// 			} else {
// 				ROTA.navTo("ListagemEquipamentos", {}, true);
// 			}
// 		}
// 	});
// });