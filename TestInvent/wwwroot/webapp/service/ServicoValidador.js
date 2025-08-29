sap.ui.define([
   "sap/ui/core/library",
], (coreLibrary) => {
   "use strict";
   
   const i18nPath = "i18n/i18n.properties";
   const ID_INPUT_NOME = "formularionome";
   const ID_SELECT_TIPO = "formulariotipo";
   const ID_INPUT_QUANTIDADE = "formularioquantidade";
   const chaveNome = "Nome";
   const chaveTipo =  "Tipo";
   const chaveQuantidade = "Quantidade";
   const mensagemDeErro = "msgCampoObrigarorio";
   const ValueState = coreLibrary.ValueState;   
   
   return {
       validarFormulario: function() {
            var i18nModel = new sap.ui.model.resource.ResourceModel({ 
            bundleUrl : i18nPath });
            var oBundle = i18nModel.getResourceBundle();
            const campos = [
                {id: ID_INPUT_NOME, chave: chaveNome, getValue: () => this.byId(ID_INPUT_NOME).getValue()},
                {id: ID_SELECT_TIPO, chave: chaveTipo, getValue: () => this.byId(ID_SELECT_TIPO).getSelectedKey()},
                {id: ID_INPUT_QUANTIDADE, chave: chaveQuantidade, getValue: () => this.byId(ID_INPUT_QUANTIDADE).getValue()}
            ];
            const mensagensErros = [];

            campos.forEach(campo => {
                const valor = campo.getValue();
                if (!valor || (campo.id === ID_INPUT_QUANTIDADE && valor < 0)) {
                    this.byId(campo.id).setValueState(ValueState.Error);
                    this.byId(campo.id).setValueStateText(oBundle.getText(mensagemDeErro, campo.chave));
                    mensagensErros.push(oBundle.getText(mensagemDeErro, campo.chave));
                    return;
                }
                this.byId(campo.id).setValueState(ValueState.None);
            });
            if (mensagensErros.length > 0) {
                return false;
            }
            return true;
        }
    }
});