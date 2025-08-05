sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],(Controller, JSONModel, Fragment) => {
    "use strict";

    const ENDPOINT_BASE = "/EquipamentoEletronico";
    const ROTA_LISTAGEM = "ListagemEquipamentos";
    const MODELO_EQUIPAMENTOS = "equipamentos";

    return Controller.extend("ui5.testinvent.controller.ListagemEquipamentos", {
        onInit: function () {
            this._oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            const ROTA = this.getOwnerComponent().getRouter();
            ROTA.getRoute(ROTA_LISTAGEM).attachPatternMatched(this._aoAcessarListar, this);
        
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
                        element.descricao = "aqui vai uma descrição do equipamento"; // Simulação de descrição
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
            console.log(oView);

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