sap.ui.define([
], function (){
    "use strict";

    return {
        obterDescricaoDoEnum: function (tipo, dadosTipo) {
            let objetoTipoEncontrado = dadosTipo.find(t => t.chave == tipo);
            let apenasDescricao = objetoTipoEncontrado?.descricao;
            return apenasDescricao 
            ? apenasDescricao 
            :  tipo; 
        },
    }
})