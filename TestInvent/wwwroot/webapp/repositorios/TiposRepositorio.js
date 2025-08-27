sap.ui.define([
    
], function (){
    "use strict";
     const ENDPOINT_BASE = "/EquipamentoEletronico";
     

    return {
        obterTipos: function(){
            let urlRequisicaoTiposEquipamento = `${ENDPOINT_BASE}/tipos`;
            return fetch(urlRequisicaoTiposEquipamento)
                .then(response => response.json());
        },
    }
});