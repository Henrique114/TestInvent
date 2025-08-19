sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment", 
    "../service/ServicoValidador",
    "../formatter/formatter", 
    "../repositorios/EquipamentoRepositorio",
    "../repositorios/TiposRepositorio"
],(Controller, JSONModel, Fragment, ServicoValidador, formatter, EquipamentoRepositorio, TiposRepositorio) => {
    "use strict";

    const ENDPOINT_BASE = "/EquipamentoEletronico";
    const ROTA_LISTAGEM = "ListagemEquipamentos";
    const ID_DETALHES_EQUIPAMENTO = "idDialogDetalhes";
    const ID_ADICIONAR_EDITAR_EQUIPAMENTO = "idAdicionarEditar";
    const NOME_FRAGMENT_DETALHES = "ui5.testinvent.view.DetalhesEquipamento";
    const NOME_FRAGMENT_ADICIONAR_EDITAR_EQUIPAMENTO = "ui5.testinvent.view.AdicionarEditarEquipamento";
    const MODELO_EQUIPAMENTOS_LISTAGEM = "equipamentos";
    const MODELO_EQUIPAMENTO_SELECIONADO_LISTA = "equipamentoSelecionadoLista";
    const MODELO_TIPOS_EQUIPAMENTO = "modeloTipoEquipamento"; 
    const MODELO_NOVO_EQUIPAMENTO = "novoEquipamento";
    const MODELO_TRADUCAO = "i18n";
    
    let _dialogAdicionarEditar = null;
    
    return Controller.extend("ui5.testinvent.controller.ListagemEquipamentos", {
        onInit: function () {
            this._oResourceBundle = this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();
            const rota = this.getOwnerComponent().getRouter();
            rota.getRoute(ROTA_LISTAGEM).attachPatternMatched(this._acessarListar, this);
        },

        // Listagem:
        //carrega dados em tela
            //busca todos os itens
            //cria modelo
            //seta dados no modelo
            //exibe modelo

        _acessarListar: function () {
            this.carregarLista();
        },

        
        aoFiltrarEquipamentos: function (evento){
            const _query = evento.getParameter("query");
            this.carregarLista(_query);
        },
        
        aoIrParaDetalhes: function (evento) {   
            
            const equipamentoSelecionado = evento
            .getSource()
            .getBindingContext(MODELO_EQUIPAMENTOS_LISTAGEM)
            .getObject().id;
                
            //this.getView().setModel(new JSONModel(equipamentoSelecionado), MODELO_EQUIPAMENTO_SELECIONADO_LISTA);
            this._abrirTelaDeDetalhes(equipamentoSelecionado);
        },

        _abrirTelaDeDetalhes: function(equipamentoSelecionado) {
            var view = this.getView();
            var dialogDetalhes = view.byId(ID_DETALHES_EQUIPAMENTO);
              debugger;
            
            if (!dialogDetalhes) {
                return this._criarTelaDeDetalhes(view)
                    .then((dialogDetalhesp) => {
                        let equipamento = EquipamentoRepositorio.obterPorId(equipamentoSelecionado);
                        this.dialogDetalhesp.setModel(new JSONModel(equipamento),MODELO_EQUIPAMENTO_SELECIONADO_LISTA);
                        dialogDetalhesp.open()

                    });
                }else{      
                    equipamento = EquipamentoRepositorio.obterPorId(equipamentoSelecionado);
                    dialogDetalhes.setModel(new JSONModel(equipamento),MODELO_EQUIPAMENTO_SELECIONADO_LISTA);  
                    dialogDetalhes.open();
                }
              
        },
        
        _criarTelaDeDetalhes: function(view) {
            return Fragment.load({
                id: view.getId(),
                name: NOME_FRAGMENT_DETALHES,
                controller: this
            }).then((dialogDetalhes) => {
                dialogDetalhes.setModel(); 
                this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();   
                view.addDependent(dialogDetalhes);
                this._dialogDetalhes = dialogDetalhes;
                return dialogDetalhes;
            });
        },
        
        aoFecharDetalhes: function() {
            this._dialogDetalhes.close();
        },
        
        aoAdicionarEquipamento: function() {
            
            this._abrirTelaAdicionarOuEditar(null);
        },
        
        aoEditar: function(evento) { 
            const contexto = "equipamentos";

            if (this._dialogDetalhes && this._dialogDetalhes.isOpen()) {
                this._dialogDetalhes.close();
            }
            
            let idEquipamento = evento
                .getSource()
                .getParent()
                .getBindingContext(contexto)
                .getObject()
                .id;

                this._abrirTelaAdicionarOuEditar(idEquipamento); 
        },
        
        _abrirTelaAdicionarOuEditar: function(idEquipamento) {
            
            let view = this.getView();
            this._dialogAdicionarEditar = view.byId(ID_ADICIONAR_EDITAR_EQUIPAMENTO);
            
            if (!_dialogAdicionarEditar) {
                 this._criarTelaAdicionarEEditarEquipamento(view)
                    .then((dialogAdicionarEditar) => {
                        dialogAdicionarEditar.open()
                        if (idEquipamento){

                            return this._carregarEquipamentoParaEdicao(idEquipamento);
                        }
                    });
                } else{
                    this._dialogAdicionarEditar.setModel(new JSONModel({}), MODELO_NOVO_EQUIPAMENTO);
                    this._dialogAdicionarEditar.open();
                }
            },

            _criarTelaAdicionarEEditarEquipamento: function(view) {
                return Fragment.load({
                    id: view.getId(),
                name: NOME_FRAGMENT_ADICIONAR_EDITAR_EQUIPAMENTO,
                controller: this

            }).then((dialogAdicionarEditar) => {
                dialogAdicionarEditar.setModel(new JSONModel({}), MODELO_NOVO_EQUIPAMENTO);

                this._carregarTiposEquipamento();
                dialogAdicionarEditar.setModel(this.getView().getModel(MODELO_TIPOS_EQUIPAMENTO)); 
                this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();   

                view.addDependent(dialogAdicionarEditar);
                this._dialogAdicionarEditar = dialogAdicionarEditar;
                return dialogAdicionarEditar;
                
            });
        },

        
        aoSalvar: function() {
            const dados = this._dialogAdicionarEditar.getModel(MODELO_NOVO_EQUIPAMENTO).getData();
            
            if (!ServicoValidador.validarFormulario.call(this)) {
                return;
            }
            
            dados.tipo = parseInt(dados.tipo),
            dados.quantidadeEmEstoque = parseInt(dados.quantidadeEmEstoque)
            
            this._salvarEquipamento(dados)
            .then(() => {
                this._obterDadosEquipamentos();
                this._dialogAdicionarEditar.destroy();
            });
        }, 
        
        _carregarTiposEquipamento: function() {
            debugger;

            let dados = TiposRepositorio.oberTipos();
            
            this.getView().setModel(new JSONModel(dados), MODELO_TIPOS_EQUIPAMENTO)
        },
        
        _salvarEquipamento: function(dados) {
            let url = `${ENDPOINT_BASE}`;
            let metodo = 'POST';
            const idEquipamento = dados.id;
            
            if (idEquipamento) {
                url =  `${url}/${idEquipamento}`;
                metodo = 'PUT';
            }
            
            return fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
        },
        
        aoFecharFormulario: function() {
           this._dialogAdicionarEditar.destroy();
        },
        carregarLista: async function (filtro) {
            
            let equipamentos = await EquipamentoRepositorio.oberTodos(filtro);
            await this._carregarTiposEquipamento();
            
            const dadosTipo = await this.getView().getModel(MODELO_TIPOS_EQUIPAMENTO).getData();
    
            equipamentos.forEach(element => {
                element.dataDeInclusao = new Date(element.dataDeInclusao);
                element.descricaoDoTipo = formatter.obterDescricaoDoEnum(element.tipo, dadosTipo); 
            });
    
            const model = new JSONModel(equipamentos);
            this.getView().setModel(model, MODELO_EQUIPAMENTOS_LISTAGEM);
            
        },
        obterPorId: function(idEquipamento) {
            const url = `${ENDPOINT_BASE}/${idEquipamento}`;
            return fetch(url)
            .then(response => response.json());
        }
    });
});