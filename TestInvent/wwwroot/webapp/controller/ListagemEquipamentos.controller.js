
sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
    
],(Controller, JSONModel, Fragment) => {
    "use strict";
    const ENDPOINT_BASE = "/EquipamentoEletronico";
    const ROTA_LISTAGEM = "ListagemEquipamentos";
    const MODELO_EQUIPAMENTOS = "equipamentos";
    const ROTA = "";
    


    return Controller.extend("ui5.testinvent.controller.ListagemEquipamentos", {



        onInit: function () {

            this._inicializarI18n();
            this._definirValorDaRota();
            if (this.ROTA) {
                this.ROTA.getRoute(ROTA_LISTAGEM).attachPatternMatched(this._aoAcessarListar, this);
            }
        
        },

        _inicializarI18n: function () {
            return this._oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        _definirValorDaRota: function () {
            this.ROTA = this.getOwnerComponent().getRouter();
        },

        _aoAcessarListar: function () {
            
            this._obterDadosEquipamentos();
        },

        _obterDadosEquipamentos: function (nome = "") {
            
            let urlRequisicaoEquipamentos = `${ENDPOINT_BASE}${nome ? "?filtro=" + encodeURIComponent(nome) : ""}`;

            fetch(urlRequisicaoEquipamentos)
                .then(response => response.json())
                .then(dados => {
                    dados.forEach(element => {
                        element.dataDeInclusao = new Date(element.dataDeInclusao);
                    });

                    
                    const oModel = new JSONModel(dados);
                    this.getView().setModel(oModel, MODELO_EQUIPAMENTOS);
                })
                
        },

        aoFiltrarEquipamentos: function (event) 
        {
            const _query = event.getParameter("query");
            this._obterDadosEquipamentos(_query);
        },
        
        aoIrParaDetalhes: function (event) {
            
            const equipamentoSelecionado = event.getSource().getBindingContext(MODELO_EQUIPAMENTOS).getObject();
            const oModelEquipamento = new JSONModel(equipamentoSelecionado);
            this.getView().setModel(oModelEquipamento, "modeloDialogo");
            this.onOpenDialog();

            
        },
    
        onOpenDialog: function() {
            var oView = this.getView();
                    // Verifica se o fragmento já foi carregado
                    if (!this.byId("idDialog")) {
                        Fragment.load({
                            id: oView.getId(),
                            name: "ui5.testinvent.view.DetalhesEquipamento",
                            controller: this
                        }).then((oDialog)=> {
                            oDialog.setModel();
                            this.getResourceBundle();   
                            oView.addDependent(oDialog);
                            this.oDialog = oDialog; // Armazena a referência do diálogo
                            oDialog.open();
                        });
                    } else {
                        this.byId("idDialog").open();
                    }
        },

        onDialogClose: function(oEvent) {
        this.oDialog.destroy(); 
        this.oDialog = null;
        },

        aoPrecionarFechar: function(oEvent) {
        this.oDialog.close();
        },

        getResourceBundle: function() {
				const nome = "i18n";
				return this
					.getOwnerComponent()
					.getModel(nome)
					.getResourceBundle();
        }
   });
});