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
    const CONTROLLER_NAME = "ui5.testinvent.controller.ListagemEquipamentos";
    const ROTA_LISTAGEM = "ListagemEquipamentos";
    const ID_ADICIONAR_EDITAR_EQUIPAMENTO = "idAdicionarEditar";
    const NOME_FRAGMENT_DETALHES = "ui5.testinvent.view.DetalhesEquipamento";
    const NOME_FRAGMENT_ADICIONAR_EDITAR_EQUIPAMENTO = "ui5.testinvent.view.AdicionarEditarEquipamento";
    const MODELO_EQUIPAMENTOS_LISTAGEM = "equipamentos";
    const MODELO_EQUIPAMENTO_SELECIONADO_LISTA = "equipamentoSelecionadoLista";
    const MODELO_TIPOS_EQUIPAMENTO = "modeloTipoEquipamento"; 
    const MODELO_NOVO_EQUIPAMENTO = "novoEquipamento";
    const MODELO_TRADUCAO = "i18n";
    const patametroQuery = "query";
    
    return Controller.extend(CONTROLLER_NAME, {

        onInit: function () {
            this._oResourceBundle = this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();
            this._iniciarModelos();
            const rota = this.getOwnerComponent().getRouter();
            rota.getRoute(ROTA_LISTAGEM).attachPatternMatched(this._acessarListar, this);
            this.view = this.getView();
        },

        modelo: function(nome, dados) {
            
            let modelo = this.getView().getModel(nome);

            if (!modelo) {
                this.getView().setModel(new JSONModel(dados), nome);
                return this.getView().getModel(nome);
            }

            if (dados) 
                modelo.setData(dados);

            return modelo;
        },

        _iniciarModelos: function(){
            let nomeModelos = [
                MODELO_EQUIPAMENTOS_LISTAGEM,
                MODELO_EQUIPAMENTO_SELECIONADO_LISTA,
                MODELO_TIPOS_EQUIPAMENTO,
                MODELO_NOVO_EQUIPAMENTO
            ];

            nomeModelos.forEach(element => this.modelo(element, {}));
        },

        _acessarListar: function () {
            return this.carregarLista();
        },

        carregarLista: async function (filtro) {
            let equipamentos = await EquipamentoRepositorio.obterTodos(filtro);
            let dadosTipo = await TiposRepositorio.obterTipos();
            this.modelo(MODELO_TIPOS_EQUIPAMENTO, dadosTipo);
            equipamentos.forEach(element => {
                element.dataDeInclusao = new Date(element.dataDeInclusao);
                element.descricaoDoTipo = formatter.obterDescricaoDoEnum(element.tipo, dadosTipo); 
            });
            let model = this.modelo(MODELO_EQUIPAMENTOS_LISTAGEM, equipamentos);
            model.refresh(true);
        },

        aoFiltrarEquipamentos: function (evento){
            this._query = evento.getParameter(patametroQuery);
            this.carregarLista(this._query);
        },

        aoIrParaDetalhes: function (evento) {
            const idEquipamentoSelecionado = evento
                .getSource()
                .getBindingContext(MODELO_EQUIPAMENTOS_LISTAGEM)
                .getObject()
                .id;

            this._abrirTelaDeDetalhes(idEquipamentoSelecionado);
        },

        _abrirTelaDeDetalhes: async function(idEquipamentoSelecionado) {
            let dadosTipo = this.modelo(MODELO_TIPOS_EQUIPAMENTO).getData();
            let equipamento = await EquipamentoRepositorio.obterPorId(idEquipamentoSelecionado);
            equipamento.dataDeInclusao = new Date(equipamento.dataDeInclusao);
            equipamento.descricaoDoTipo = formatter.obterDescricaoDoEnum(equipamento.tipo, dadosTipo);
            let modeloEquipamentoSelecionado = this.modelo(MODELO_EQUIPAMENTO_SELECIONADO_LISTA, equipamento)
            
            let dialogDetalhes = await this._criarTelaDeDetalhes();
            dialogDetalhes.setModel(modeloEquipamentoSelecionado);
            dialogDetalhes.open();
        },

        _criarTelaDeDetalhes: function() {
            return Fragment.load({
                id: this.view.getId(),
                name: NOME_FRAGMENT_DETALHES,
                controller: this
            }).then((dialogDetalhes) => {
                dialogDetalhes.setModel();
                this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();   
                this.view.addDependent(dialogDetalhes);
                this._dialogDetalhes = dialogDetalhes
                return dialogDetalhes;
            });
        },

        aoFecharDetalhes: function() {
            this._dialogDetalhes.destroy();
        },

        aoAdicionarEquipamento: function() {
            let modeloNovoEquipamento = this.modelo(MODELO_NOVO_EQUIPAMENTO, {});
            modeloNovoEquipamento.refresh(true);
            this._abrirTelaAdicionarOuEditar(null);
        },

        aoClicarEmEditarrNoDialogDeDetalhes: function(){
            let idEquipamento = this.modelo(MODELO_EQUIPAMENTO_SELECIONADO_LISTA).getProperty("/id")
            this._abrirTelaAdicionarOuEditar(idEquipamento);
            this._dialogDetalhes.destroy();
        },

        aoClicarEmEditarNaLinha: function(evento){
            let idEquipamento = evento
                .getSource()
                .getBindingContext(MODELO_EQUIPAMENTOS_LISTAGEM)
                .getObject()
                .id;

            this._abrirTelaAdicionarOuEditar(idEquipamento);
        },

        _abrirTelaAdicionarOuEditar: async function(idEquipamento) {
            let dialogAdicionarEditar = this.view.byId(ID_ADICIONAR_EDITAR_EQUIPAMENTO);

            if (!dialogAdicionarEditar) 
                dialogAdicionarEditar = await this._criarTelaAdicionarEEditarEquipamento();

            dialogAdicionarEditar.open();

            if (idEquipamento) {
                let equipamento = await EquipamentoRepositorio.obterPorId(idEquipamento);
                let dadosTipo = this.modelo(MODELO_TIPOS_EQUIPAMENTO).getData();
                equipamento.descricaoDoTipo = formatter.obterDescricaoDoEnum(equipamento.tipo, dadosTipo);
                let modeloNovoEquipamento = this.modelo(MODELO_NOVO_EQUIPAMENTO, equipamento);
                modeloNovoEquipamento.refresh(true);
            }
        },

        _criarTelaAdicionarEEditarEquipamento: function() {
            return Fragment.load({
                id: this.view.getId(),
                name: NOME_FRAGMENT_ADICIONAR_EDITAR_EQUIPAMENTO,
                controller: this
            }).then((dialogAdicionarEditar) => {
                this.getOwnerComponent().getModel(MODELO_TRADUCAO).getResourceBundle();   
                this.view.addDependent(dialogAdicionarEditar);
                this._dialogAdicionarEditar = dialogAdicionarEditar;
                return dialogAdicionarEditar;
            });
        },

        aoSalvar: function() {
            const equipamento = this.modelo(MODELO_NOVO_EQUIPAMENTO).getData();

            if (!ServicoValidador.validarFormulario.call(this)) 
                return;
            
            equipamento.tipo = parseInt(equipamento.tipo);
            equipamento.quantidadeEmEstoque = parseInt(equipamento.quantidadeEmEstoque);

            if (equipamento.id){
                EquipamentoRepositorio.atualizar(equipamento)
                    .then(() => {
                        this.carregarLista(this._query);
                        this._dialogAdicionarEditar.destroy();
                    });
            } else {
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

        aoClicarEmDeletarNoDialogDeDetalhes: function(){
            let idEquipamento = this.modelo(MODELO_EQUIPAMENTO_SELECIONADO_LISTA).getProperty("/id")
            this._abrirConfirmcaoDeletarEquipamento(idEquipamento);
            this._dialogDetalhes.destroy();
        },

        aoClicarEmDeletarNaLinha: function(evento){
            let idEquipamento = evento
                .getSource()
                .getBindingContext(MODELO_EQUIPAMENTOS_LISTAGEM)
                .getObject()
                .id;

            this._abrirConfirmcaoDeletarEquipamento(idEquipamento);
        },

        _abrirConfirmcaoDeletarEquipamento: async function(idEquipamento){
            this.dialogConfirmacao = await FragmentoConfirmacaoExclusao.criarDialogDeConfirmação(this, idEquipamento);
            return this.dialogConfirmacao.open();
        },

        aoPressinarConfirmar: function(id){
            return EquipamentoRepositorio.deletar(id)
                .then(() => this.carregarLista(this._query));
        },
    });
});