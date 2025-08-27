sap.ui.define([
   "sap/ui/core/library",
], (coreLibrary) => {
   "use strict";
    const ID_INPUT_NOME = "formularionome";
    const ID_SELECT_TIPO = "formulariotipo";
    const ID_INPUT_QUANTIDADE = "formularioquantidade";

   const ValueState = coreLibrary.ValueState;   

    return {

        validarFormulario: function() {
            const campos = [
                {id: ID_INPUT_NOME, chave: "Nome", getValue: () => this.byId(ID_INPUT_NOME).getValue()},
                {id: ID_SELECT_TIPO, chave: "Tipo", getValue: () => this.byId(ID_SELECT_TIPO).getSelectedKey()},
                {id: ID_INPUT_QUANTIDADE, chave: "Quantidade", getValue: () => this.byId(ID_INPUT_QUANTIDADE).getValue()}
            ];
            const mensagensErros = [];

            campos.forEach(campo => {
                const valor = campo.getValue();
                if (!valor || (campo.id === ID_INPUT_QUANTIDADE && valor < 0)) {
                    this.byId(campo.id).setValueState(ValueState.Error);
                    this.byId(campo.id).setValueStateText(`${campo.chave} é obrigatorio`);
                    mensagensErros.push(`${campo.chave} é obrigatorio`);
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