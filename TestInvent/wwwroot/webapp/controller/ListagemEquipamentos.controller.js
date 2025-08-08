sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],(Controller, JSONModel, Fragment) => {
    "use strict";

    const ENDPOINT_BASE = "/EquipamentoEletronico";
    const ROTA_LISTAGEM = "ListagemEquipamentos";
    const MODELO_EQUIPAMENTOS = "equipamentos";
    const MODELO_TRADUCAO = "i18n";
    const ID_TELA_DETALHES = "idDialog";  
    const ID_TELA_NOVO_EQUIPAMENTO = "idCadastroEAlterar";
    const NOME_FRAGMENT_DETALHES = "ui5.testinvent.view.DetalhesEquipamento";
    const NOME_FRAGMENT_NOVO_EQUIPAMENTO = "ui5.testinvent.view.AdicionarEAtualizarEquipamento";
    const ITEM_SELECIONADO_LISTA = "modeloDialogo";
    const NOVO_EQUIPAMENTO = "modeloEquipamento";

    return Controller.extend("ui5.testinvent.controller.ListagemEquipamentos", {
        onInit: function () {
            this._oResourceBundle = this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();
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
                        //element.tipo = this._mapearTipoDoEquipamneto(element.tipo);
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
            this.getView().setModel(oModelEquipamento, ITEM_SELECIONADO_LISTA);
            this.AoAbrirTelaDeDetalhes();
        },

        AoAbrirTelaDeDetalhes: function() {
           var view = this.getView();

            if (!this.byId(ID_TELA_DETALHES)) {
                this.criarTelaDeDetalhes(view)
                .then((dialog) => {
                    dialog.open();
                });
            } else {
                this.byId(ID_TELA_DETALHES).open();
            }
        },

        criarTelaDeDetalhes: function(view) {
          
            return Fragment.load({
                id: view.getId(),
                name: NOME_FRAGMENT_DETALHES,
                controller: this
            }).then((dialog) => {
                dialog.setModel(); 
                this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();   
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

            if (!this.byId(ID_TELA_NOVO_EQUIPAMENTO)) {
                this.criarTelaDeNovoEquipamento(view)
                .then((dialog) => {
                    dialog.open();
                });
            } else {
                this.byId(ID_TELA_NOVO_EQUIPAMENTO).open();
            }
        },

        criarTelaDeNovoEquipamento: function(view) {
            
            return Fragment.load({
                id: view.getId(),
                name: NOME_FRAGMENT_NOVO_EQUIPAMENTO,
                controller: this
            }).then((dialog) => {

                dialog.setModel(new JSONModel({}), NOVO_EQUIPAMENTO);
                this._carregarTiposEquipamento();
                dialog.setModel(this.getView().getModel("modeloTipoEquipamento")); 
                this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();   
                view.addDependent(dialog);
                this.oDialog = dialog;
                return dialog;
            });
        },

        aoPressionarFechar: function(evento) {
            this.oDialog.close();
        },

        aoPressionarSalvar: function(evento) {
            const dialog = this.byId(ID_TELA_NOVO_EQUIPAMENTO);
            const dados = dialog.getModel(NOVO_EQUIPAMENTO).getData();
            const dadosTipo = dialog.getModel("modeloTipoEquipamento").getData();

            const objeto = {
                nome: dados.nome,
                tipo: parseInt(dadosTipo.tipoSelecionado),
                quantidadeEmEstoque: parseInt(dados.quantidadeEmEstoque),
                descricao: dados.descricao
            };

            const url = `${ENDPOINT_BASE}`;
            const metodo = 'POST';

            const resposta = fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objeto)
            })
            .then(resposta => resposta.json())
            .then(dialog => {
                this.oDialog.close();
            });
        }, 
        
         _carregarTiposEquipamento: function() {

            let urlRequisicaoTiposEquipamento = `${ENDPOINT_BASE}/tipos`;

            fetch(urlRequisicaoTiposEquipamento)
                .then(response => response.json())
                .then(dados => {
                   
                    const modeloTipoEquipamento = new JSONModel({dados, tipoSelecionado: "Notebook"});
                    console.log(modeloTipoEquipamento);
                    this.getView().setModel(modeloTipoEquipamento, "modeloTipoEquipamento");
            })
        },
        
        
       

        // _mapearTipoDoEquipamneto: function(tipo) {
        //     var tipoS = "";
        //     switch (tipo) {
        //         case 1:
        //             tipoS = "Notebook";
        //             break;
        //         case 2:
        //             tipoS = "Teclado";
        //             break;
        //         case 3:
        //             tipoS = "Mouse";
        //             break;
        //         case 4:
        //             tipoS = "Monitor";
        //             break;
        //         case 5:
        //             tipoS = "Headset";
        //             break;
               
        //         default:
        //             tipoS = "Outros";
        //     }
        //     return tipoS;
        // }, 
   });
});