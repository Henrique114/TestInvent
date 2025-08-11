sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment", 
    "../service/ServicoValidador",
    "../formatter/formatter"
],(Controller, JSONModel, Fragment, ServicoValidador, formatter) => {
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
    const MODELO_TIPO_EQUIPAMENTO = "modeloTipoEquipamento"; 

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
            this._carregarTiposEquipamento();

            fetch(urlRequisicaoEquipamentos)
                .then(response => response.json())
                .then(equipamentos => {
                    const dadosTipo = this.getView().getModel(MODELO_TIPO_EQUIPAMENTO).getData();

                    equipamentos.forEach(element => {
                        element.dataDeInclusao = new Date(element.dataDeInclusao);

                       element.descricaoDoTipo = formatter.obterDescricaoDoEnum(element.tipo, dadosTipo); //passa o que esta buscando e as opcoes
                    });

                    console.log(equipamentos);

                    const model = new JSONModel(equipamentos);
                   
                    this.getView().setModel(model, MODELO_EQUIPAMENTOS);
            })
                
        },

        // obterDescricaoDoEnum: function (tipo, dadosTipo) {
        //     let objetoTipoEncontrado = dadosTipo.find(t => t.chave == tipo);

        //     let apenasDescricao = objetoTipoEncontrado?.descricao;
        //     const tipoNaoEncontrado = "Tipo não encontrado";

        //     return apenasDescricao 
        //                     ? apenasDescricao 
        //                     : tipoNaoEncontrado; 
        // },

        aoFiltrarEquipamentos: function (event){
            const _query = event.getParameter("query");
            this._obterDadosEquipamentos(_query);
        },
        
        aoIrParaDetalhes: function (event) {   
            const equipamentoSelecionado = event
                .getSource()
                .getBindingContext(MODELO_EQUIPAMENTOS)
                .getObject();

            this.getView().setModel(new JSONModel(equipamentoSelecionado), ITEM_SELECIONADO_LISTA);
            this.AoAbrirTelaDeDetalhes();
        },

        AoAbrirTelaDeDetalhes: function() {
           var view = this.getView();
           var id = this.byId(ID_TELA_DETALHES);

            if (!id) {
                this.criarTelaDeDetalhes(view)
                    .then((dialog) => dialog.open());
            } else {
                id.open();
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
           var id = this.byId(ID_TELA_NOVO_EQUIPAMENTO);

            if (!id) {
                this.criarTelaDeNovoEquipamento(view)
                    .then((dialog) => dialog.open());
            } else {
                id.open();
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
                dialog.setModel(this.getView().getModel(MODELO_TIPO_EQUIPAMENTO)); 
                this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();   
                view.addDependent(dialog);
                this.oDialog = dialog;
                return dialog;
            });
        },

        aoPressionarFechar: function() {
            this.oDialog.close();
        },

        aoPressionarSalvar: function() {
            const dialog = this.byId(ID_TELA_NOVO_EQUIPAMENTO);
            const dados = dialog.getModel(NOVO_EQUIPAMENTO).getData();

            if (!ServicoValidador.validarFormulario.call(this)) {
                return;
            }
            dados.tipo = parseInt(dados.tipo),
            dados.quantidadeEmEstoque = parseInt(dados.quantidadeEmEstoque)

            const url = `${ENDPOINT_BASE}`;
            const metodo = 'POST';

            fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
            .then(() => {
                this._obterDadosEquipamentos();
                this.oDialog.close();
            });
        }, 
        
        _carregarTiposEquipamento: function() {
            let urlRequisicaoTiposEquipamento = `${ENDPOINT_BASE}/tipos`;

            fetch(urlRequisicaoTiposEquipamento)
                .then(response => response.json())
                .then(dados => this.getView().setModel(new JSONModel(dados), MODELO_TIPO_EQUIPAMENTO))
        },
   });
});