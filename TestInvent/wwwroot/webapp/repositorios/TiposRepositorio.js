sap.ui.define([
    
], function (){
    "use strict";
     const ENDPOINT_BASE = "/EquipamentoEletronico";
     

    return {
        oberTipos: function(){
            let urlRequisicaoTiposEquipamento = `${ENDPOINT_BASE}/tipos`;
            
            return fetch(urlRequisicaoTiposEquipamento)
                .then(response => response.json());
            
                
        },
     }
});