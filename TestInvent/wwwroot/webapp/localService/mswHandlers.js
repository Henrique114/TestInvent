sap.ui.define([], function() {
    "use strict";

    // Simulação dos endpoints REST
    const handlers = [
        {
            method: "GET",
            path: "/EquipamentoEletronico",
            handle: function(req) {
                return [
                    {
                        id: "1",
                        nome: "Notebook",
                        tipo: 1,
                        quantidadeEmEstoque: 10,
                        dataDeInclusao: "2023-08-01T00:00:00Z",
                        descricao: "Notebook Dell",
                        temEmEstoque: true
                    }
                    // ...outros equipamentos
                ];
            }
        },
        {
            method: "GET",
            path: "/EquipamentoEletronico/tipos",
            handle: function(req) {
                return [
                    { id: 1, descricao: "Notebook" },
                    { id: 2, descricao: "Monitor" }
                ];
            }
        },
        {
            method: "GET",
            path: /^\/EquipamentoEletronico\/\w+$/,
            handle: function(req) {
                const id = req.url.split("/").pop();
                return {
                    id,
                    nome: "Notebook",
                    tipo: 1,
                    quantidadeEmEstoque: 10,
                    dataDeInclusao: "2023-08-01T00:00:00Z",
                    descricao: "Notebook Dell",
                    temEmEstoque: true
                };
            }
        },
        {
            method: "POST",
            path: "/EquipamentoEletronico",
            handle: function(req) {
                return { status: 201 };
            }
        },
        {
            method: "PUT",
            path: /^\/EquipamentoEletronico\/\w+$/,
            handle: function(req) {
                return { status: 200 };
            }
        },
        {
            method: "DELETE",
            path: /^\/EquipamentoEletronico\/\w+$/,
            handle: function(req) {
                return { status: 204 };
            }
        }
    ];

    return handlers;
});