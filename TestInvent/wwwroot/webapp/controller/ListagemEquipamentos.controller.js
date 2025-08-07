sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
],(Controller, JSONModel, Fragment) => {
    "use strict";

    const ENDPOINT_BASE = "/EquipamentoEletronico";
    const ROTA_LISTAGEM = "ListagemEquipamentos";
    const MODELO_EQUIPAMENTOS = "equipamentos";

    return Controller.extend("ui5.testinvent.controller.ListagemEquipamentos", {
        onInit: function () {
            this._oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            const rota = this.getOwnerComponent().getRouter();
            rota.getRoute(ROTA_LISTAGEM).attachPatternMatched(this._aoAcessarListar, this);
        
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
                        element.tipo = this._mapearTipoDoEquipamneto(element.tipo);
                    });

                    const model = new JSONModel(dados);
                    this.getView().setModel(model, MODELO_EQUIPAMENTOS);
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
            this.AoAbrirTelaDeDetalhes();
        },

        AoAbrirTelaDeDetalhes: function() {
           var view = this.getView();

            if (!this.byId("idDialog")) {
                this.criarTelaDeDetalhes(view)
                .then((dialog) => {
                    dialog.open();
                });
            } else {
                this.byId("idDialog").open();
            }
        },

        criarTelaDeDetalhes: function(view) {
          
            return Fragment.load({
                id: view.getId(),
                name: "ui5.testinvent.view.DetalhesEquipamento",
                controller: this
            }).then((dialog) => {
                dialog.setModel(); 
                this.getOwnerComponent().getModel("i18n").getResourceBundle();   
                view.addDependent(dialog);
                this.oDialog = dialog;
                return dialog;
            });
        },

        aoIrParaNovoEquipamento: function() {
                   
            this.AoAbrirTelaDeNovoEquipamento();
           
        },

         AoAbrirTelaDeNovoEquipamento: function() {
           var view = this.getView();

            if (!this.byId("idCadastroEAlterar")) {
                this.criarTelaDeNovoEquipamento(view)
                .then((dialog) => {
                    dialog.open();
                });
            } else {
                this.byId("idCadastroEAlterar").open();
            }
        },

         criarTelaDeNovoEquipamento: function(view) {
            
            
            return Fragment.load({
                id: view.getId(),
                name: "ui5.testinvent.view.AdicionarEAtualizarEquipamento",
                controller: this
            }).then((dialog) => {

                dialog.setModel(new JSONModel({}), "modeloEquipamento");
                this._carregarTiposEquipamento();
                dialog.setModel(this.getView().getModel("modeloTipoEquipamento")); 
                this.getOwnerComponent().getModel("i18n").getResourceBundle();   
                view.addDependent(dialog);
                this.oDialog = dialog;
                return dialog;
            });
        },

         aoPrecionarFechar: function(evento) {
        this.oDialog.close();
        },

        aoPrecionarSalvar: function(evento) {
            debugger;
            const dialog = this.byId("idCadastroEAlterar");
            const dados = dialog.getModel("modeloEquipamento").getData();
            const dadosTipo = dialog.getModel("modeloTipoEquipamento").getData();
            dados.tipo = dadosTipo.tipoSelecionado; 
            console.log(dados);
            const url = `${ENDPOINT_BASE}/${dados.id || ''}`;
            const metodo = dados.id ? 'PUT' : 'POST';

            fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
            .then(response => response.json())
            .then(() => {
                dialog.close();
            })
            .catch(error => {
                console.error('Erro ao salvar equipamento:', error);
            });
        },    
        
        _carregarTiposEquipamento: function() {
                
                var modeloTipoEquipamento = new JSONModel({
                tipos: [
                    { Tipo: 1, Descricao: "Notebook" },
                    { Tipo: 2, Descricao: "Teclado" },
                    { Tipo: 3, Descricao: "Mouse" },
                    { Tipo: 4, Descricao: "Monitor" },
                    { Tipo: 5, Descricao: "Headset" },
                ],
                tipoSelecionado: "Notebook" 
            });

            this.getView().setModel(modeloTipoEquipamento, "modeloTipoEquipamento");
        },

        _mapearTipoDoEquipamneto: function(tipo) {
            var tipoS = "";
            switch (tipo) {
                case 1:
                    tipoS = "Notebook";
                    break;
                case 2:
                    tipoS = "Teclado";
                    break;
                case 3:
                    tipoS = "Mouse";
                    break;
                case 4:
                    tipoS = "Monitor";
                    break;
                case 5:
                    tipoS = "Headset";
                    break;
               
                default:
                    tipoS = "Outros";
            }
            return tipoS;
        }, 

        aoSelecionarTipo: function (evento) {
            const oSelectedItem = evento.getSource().getSelectedItem();
            const sSelectedKey = evento.getSource().getSelectedKey();
            const sSelectedText = oSelectedItem.getText();
            console.log("Chave selecionada:", sSelectedKey);
            console.log("Texto selecionado:", sSelectedText); 
            console.log("Item selecionado:", oSelectedItem);  


            const oText = this.getView().byId("selectedText");
            oText.setText("Chave selecionada: " + sSelectedKey + ", Texto selecionado: " + sSelectedText);

            MessageToast.show("Você selecionou: " + sSelectedText);
        }

        
   });
});