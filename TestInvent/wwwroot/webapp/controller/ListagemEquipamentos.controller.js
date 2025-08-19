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
    let _dialogDetalhes = null;
    
    return Controller.extend("ui5.testinvent.controller.ListagemEquipamentos", {
        onInit: function () {
            this._oResourceBundle = this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();
            const rota = this.getOwnerComponent().getRouter();
            rota.getRoute(ROTA_LISTAGEM).attachPatternMatched(this._acessarListar, this);
            
        },

        _iniciarModelos: function(){
            this.getView().setModel(new JSONModel({}), MODELO_EQUIPAMENTOS_LISTAGEM);
            this.getView().setModel(new JSONModel({}), MODELO_EQUIPAMENTO_SELECIONADO_LISTA);
            this.getView().setModel(new JSONModel({}), MODELO_TIPOS_EQUIPAMENTO);
            this.getView().setModel(new JSONModel({}), MODELO_NOVO_EQUIPAMENTO);
        },

        _acessarListar: function () {
            this.carregarLista();
            this._iniciarModelos();
        },

        carregarLista: async function (filtro) {
            let equipamentos = await EquipamentoRepositorio.oberTodos(filtro);
            let dadosTipo = await TiposRepositorio.oberTipos();
             
            equipamentos.forEach(element => {
                element.dataDeInclusao = new Date(element.dataDeInclusao);
                element.descricaoDoTipo = formatter.obterDescricaoDoEnum(element.tipo, dadosTipo); 
            });

            let model = this.getView().getModel(MODELO_EQUIPAMENTOS_LISTAGEM);
            model.setData(equipamentos);
            model.refresh(true);
            
        },
        
        aoFiltrarEquipamentos: function (evento){
            const _query = evento.getParameter("query");
            this.carregarLista(_query);
        },
        
        // Ir para detalhes
        // clica o item
        // obtem o id do item ok
        // abre tela de detalhes
            // verifica se há uma tela já criada 
                //se não tiver cria
                //se tiver, abre usando a referencia da view com o id do dialog
            //busca o item no banco pelo id
            //cria o modelo para o item selecionado
            //seta os dados da busca no modelo
            //exibe os dados em tela
            

        aoIrParaDetalhes: function (evento) {   
            
            const equipamentoSelecionado = evento
            .getSource()
            .getBindingContext(MODELO_EQUIPAMENTOS_LISTAGEM)
            .getObject().id;
                
            this._abrirTelaDeDetalhes(equipamentoSelecionado);
        },


        _abrirTelaDeDetalhes: async function(equipamentoSelecionado) {
            let dialogDetalhes = this.getView().byId(ID_DETALHES_EQUIPAMENTO);
            let dadosTipo = await TiposRepositorio.oberTipos();
            let model = this.getView().getModel(MODELO_EQUIPAMENTO_SELECIONADO_LISTA);
            let equipamento = await EquipamentoRepositorio.obterPorId(equipamentoSelecionado);
            equipamento.dataDeInclusao = new Date(equipamento.dataDeInclusao);
            equipamento.descricaoDoTipo = formatter.obterDescricaoDoEnum(equipamento.tipo, dadosTipo);
            
            if (!dialogDetalhes) {
                dialogDetalhes = await this._criarTelaDeDetalhes();
               
            }

            dialogDetalhes.setModel(this.getView().getModel(MODELO_EQUIPAMENTO_SELECIONADO_LISTA));  
            model.setData(equipamento);
            model.refresh(true);
            dialogDetalhes.open();
              
        },
        
        _criarTelaDeDetalhes: function() {
            return Fragment.load({
                id: this.getView().getId(),
                name: NOME_FRAGMENT_DETALHES,
                controller: this
            }).then((dialogDetalhes) => {
                dialogDetalhes.setModel();
                this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();   
                this.getView().addDependent(dialogDetalhes);

                this._dialogDetalhes = dialogDetalhes
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
                    // TiposRepositorio.oberTipos();
                    // dialogAdicionarEditar.setModel(this.getView().getModel(MODELO_TIPOS_EQUIPAMENTO)); 
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
    });
});