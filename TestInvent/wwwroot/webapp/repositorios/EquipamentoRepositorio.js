sap.ui.define([
    "../formatter/formatter"

], function (formatter){
    "use strict";
     const ENDPOINT_BASE = "/EquipamentoEletronico";
     const MODELO_EQUIPAMENTOS_LISTAGEM = "equipamentos";
     const MODELO_TIPOS_EQUIPAMENTO = "modeloTipoEquipamento";

    return {
      OberTodos: function(nome = ""){
          let urlRequisicaoEquipamentos = `${ENDPOINT_BASE}${nome ? "?filtro=" + encodeURIComponent(nome) : ""}`;
            this.getView().getController()._carregarTiposEquipamento();

            fetch(urlRequisicaoEquipamentos)
                .then(response => response.json())
                .then(equipamentos => {
                    const dadosTipo = this.getView().getModel(MODELO_TIPOS_EQUIPAMENTO).getData();

                    equipamentos.forEach(element => {
                        element.dataDeInclusao = new Date(element.dataDeInclusao);
                        element.descricaoDoTipo = formatter.obterDescricaoDoEnum(element.tipo, dadosTipo); 
                    });

                    const model = new JSONModel(equipamentos);
                    this.getView().setModel(model, MODELO_EQUIPAMENTOS_LISTAGEM);
            })
      }
    }
})