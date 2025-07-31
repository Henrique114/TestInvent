
sap.ui.define([], function () {
    "use strict";


    function _obterMesComIncremento(mes) {
        const incremento = 1;
        return mes + incremento;
    }

    return {
      

        formatarData: function (sData) {
            const oDate = new Date(sData);

            const quantidadeMaxima = 2;
            const valorDePreenchimento = "0";
            const dia = String(oDate.getDate()).padStart(quantidadeMaxima, valorDePreenchimento);
            const mes = String(_obterMesComIncremento(oDate.getMonth())).padStart(quantidadeMaxima, valorDePreenchimento);
            const ano = oDate.getFullYear();
            const hora = String(oDate.getHours()).padStart(quantidadeMaxima, valorDePreenchimento);
            const minuto = String(oDate.getMinutes()).padStart(quantidadeMaxima, valorDePreenchimento);

            return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
        }
    };
});
