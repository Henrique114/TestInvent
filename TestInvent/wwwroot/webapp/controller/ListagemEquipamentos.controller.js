sap.ui.define([
   "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment", 
    "../service/ServicoValidador",
    "../formatter/formatter", 
    "../repositorios/EquipamentoRepositorio",
    "../repositorios/TiposRepositorio", 
    "../fragment/FragmentoConfirmacaoExclusao"
],(Controller, JSONModel, Fragment, ServicoValidador, formatter, EquipamentoRepositorio, TiposRepositorio, FragmentoConfirmacaoExclusao) => {
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
    const patametroQuery = "query";

    let _dialogAdicionarEditar = null;
    let _dialogDetalhes = null;
    let _query = null;
    
    return Controller.extend("ui5.testinvent.controller.ListagemEquipamentos", {
        onInit: function () {
            this._oResourceBundle = this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();
            this._iniciarModelos();
            const rota = this.getOwnerComponent().getRouter();
            rota.getRoute(ROTA_LISTAGEM).attachPatternMatched(this._acessarListar, this);
        },

         criarModelos: function(nome, modelo){
             let view = this.getView();
             if(modelo) view.setModel(modelo, nome);
             return view.getModel(nome);
        },

        _iniciarModelos: function(){
            let nomeModelos =   [MODELO_EQUIPAMENTOS_LISTAGEM,
                                 MODELO_EQUIPAMENTO_SELECIONADO_LISTA,
                                 MODELO_TIPOS_EQUIPAMENTO,
                                 MODELO_NOVO_EQUIPAMENTO];
 
             nomeModelos.forEach(element =>
                 this.criarModelos(element, new JSONModel({}))
             );
        },

        _acessarListar: function () {
            this.carregarLista();
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
             this._query = evento.getParameter(patametroQuery);
            this.carregarLista(this._query);
        },
        
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
           let idEquipamento = null; 
           const modelEquipamentos = evento.getSource().getBindingContext(MODELO_EQUIPAMENTOS_LISTAGEM);

            if (modelEquipamentos) {
                
                idEquipamento = modelEquipamentos
                    .getObject().id;
            }else{
                idEquipamento = this._dialogDetalhes
                                    .getModel(MODELO_EQUIPAMENTO_SELECIONADO_LISTA)
                                    .getData()
                                    .id;
            }

            this._dialogDetalhes && this._dialogDetalhes.isOpen()? this._dialogDetalhes.close(): null;
            this._abrirTelaAdicionarOuEditar(idEquipamento); 
        },
        
        _abrirTelaAdicionarOuEditar: async function(idEquipamento) {
            let dialogAdicionarEditar = this.getView().byId(ID_ADICIONAR_EDITAR_EQUIPAMENTO);
            let model = this.getView().getModel(MODELO_NOVO_EQUIPAMENTO);
            let modelTipos = this.getView().getModel(MODELO_TIPOS_EQUIPAMENTO);
            if (!dialogAdicionarEditar) {
                dialogAdicionarEditar = await this._criarTelaAdicionarEEditarEquipamento();
               
            }


            dialogAdicionarEditar.setModel(this.getView().getModel(MODELO_TIPOS_EQUIPAMENTO)); 
            let dadosTipos = await TiposRepositorio.oberTipos();
            modelTipos.setData(dadosTipos);
            modelTipos.refresh(true);

            dialogAdicionarEditar.setModel(this.getView().getModel(MODELO_NOVO_EQUIPAMENTO));  
            model.setData({});
            model.refresh(true);
            dialogAdicionarEditar.open();
            if(idEquipamento){
                let equipamento = await EquipamentoRepositorio.obterPorId(idEquipamento);
                equipamento.dataDeInclusao = new Date(equipamento.dataDeInclusao);
                equipamento.descricaoDoTipo = formatter.obterDescricaoDoEnum(equipamento.tipo, dadosTipos);
                model.setData(equipamento);
                model.refresh(true);
            }
        },

        _criarTelaAdicionarEEditarEquipamento: function() {
            return Fragment.load({
                id: this.getView().getId(),
                name: NOME_FRAGMENT_ADICIONAR_EDITAR_EQUIPAMENTO,
                controller: this

            }).then((dialogAdicionarEditar) => {
                this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();   
                this.getView().addDependent(dialogAdicionarEditar);
                this._dialogAdicionarEditar = dialogAdicionarEditar;
                return dialogAdicionarEditar;
                
            });
        },

        
        aoSalvar: function() {
            const equipamento = this._dialogAdicionarEditar.getModel(MODELO_NOVO_EQUIPAMENTO).getData();
            
            if (!ServicoValidador.validarFormulario.call(this)) {
                return;
            }
            
            equipamento.tipo = parseInt(equipamento.tipo),
            equipamento.quantidadeEmEstoque = parseInt(equipamento.quantidadeEmEstoque)

            if (equipamento.id){
                EquipamentoRepositorio.atualizar(equipamento)
                .then(() => {
                    this.carregarLista(this._query);
                    this._dialogAdicionarEditar.destroy();
                });

            }else{
                EquipamentoRepositorio.criar(equipamento)
                .then(() => {
                    this.carregarLista(this._query);
                    this._dialogAdicionarEditar.destroy();
                });
            }
        }, 
        
        aoFecharFormulario: function() {
            this._dialogAdicionarEditar.destroy();
        },

        aoPressionarDeletar: function(evento){
            let idEquipamento = null;
            const modelEquipamentos = evento.getSource().getBindingContext(MODELO_EQUIPAMENTOS_LISTAGEM);

            if (modelEquipamentos) {
                idEquipamento = modelEquipamentos
                                .getObject()
                                .id;
            }else{

                idEquipamento = this._dialogDetalhes
                                    .getModel(MODELO_EQUIPAMENTO_SELECIONADO_LISTA)
                                    .getData()
                                    .id;
            }
 
            this._dialogDetalhes && this._dialogDetalhes.isOpen()
            ? this._dialogDetalhes.close()
            : null;

            this._abrirConfirmcaoDeletarEquipamento(idEquipamento);
        },
 
        _abrirConfirmcaoDeletarEquipamento: async function(idEquipamento){
            let dialogConfirmacao = await FragmentoConfirmacaoExclusao.criarDialogDeConfirmação(this, idEquipamento);
            dialogConfirmacao.open();
        },
 
        aoPressinarConfirmar: async function(id){
            await EquipamentoRepositorio.deletar(id)
            .then(() => this.carregarLista(this._query));
        },
    });
});