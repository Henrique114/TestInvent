sap.ui.define([
], function (){
    "use strict";
     const ENDPOINT_BASE = "/EquipamentoEletronico";
     
    return {
        criar: function(dados){
            const url = `${ENDPOINT_BASE}`;
            const metodo = 'POST';
            return fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
        },

        obterTodos: function(filtro){
            let urlRequisicaoEquipamentos = `${ENDPOINT_BASE}${filtro ? "?filtro=" + encodeURIComponent(filtro) : ""}`;
            return fetch(urlRequisicaoEquipamentos)
            .then((response) => response.json());
        },

        obterPorId: function(idEquipamento) {
            const url = `${ENDPOINT_BASE}/${idEquipamento}`;
            return fetch(url)
            .then(response => response.json());
        },

        atualizar: function(dados){
            const idEquipamento = dados.id;
            const url =  `${ENDPOINT_BASE}/${idEquipamento}`;
            const metodo = 'PUT';
            return fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
        },
        
        deletar: function(id){
            const url = `${ENDPOINT_BASE}/${id}`;
            const metodo = 'DELETE';
            return fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        }
    }
});