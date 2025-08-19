sap.ui.define([
    
], function (){
    "use strict";
     const ENDPOINT_BASE = "/EquipamentoEletronico";
     

    return {
        oberTodos: function(filtro){
            let urlRequisicaoEquipamentos = `${ENDPOINT_BASE}${filtro ? "?filtro=" + encodeURIComponent(filtro) : ""}`;
            
            return fetch(urlRequisicaoEquipamentos)
                .then(response => response.json());
                
        },

        obterPorId: function(idEquipamento) {
            const url = `${ENDPOINT_BASE}/${idEquipamento}`;

            return fetch(url)
                .then(response => response.json());
        },

        atualizar: function(){


        },

        deletar: function(){

        }   
     }
});