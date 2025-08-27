sap.ui.define([
    "sap/ui/test/Opa5"
], function (Opa5) {
    "use strict";

    const ID_INICIAL_MOCK = 3;
    const URL_BASE = "/EquipamentoEletronico";

    let equipamentos = [
        { id: "Equipamento-1-A", nome: "TesteA", tipo: 1, quantidadeEmEstoque: 10, dataDeInclusao: "2025-08-25T13:39:38.1443059Z", temEstoque: true },
        { id: "Equipamento-2-A", nome: "TesteB", tipo: 4, quantidadeEmEstoque: 0, dataDeInclusao: "2025-08-25T13:39:38.1443059Z", temEstoque: false }
    ];

    let tipos = [
  {
    "chave": 1,
    "descricao": "Notebook"
  },
  {
    "chave": 2,
    "descricao": "Teclado"
  },
  {
    "chave": 3,
    "descricao": "Mouse"
  },
  {
    "chave": 4,
    "descricao": "Monitor"
  },
  {
    "chave": 5,
    "descricao": "Headset"
  }
];

    let proximoId = ID_INICIAL_MOCK;


    function mockFetch(url, opcoesFetch) {

        debugger;
        if (opcoesFetch?.method === "DELETE") {
            const id = url.split("/").pop();
            if (id) { 
                var equipamentosAtualizados = equipamentos.filter((item) => item.id !== id); 
                equipamentos = equipamentosAtualizados;
            }
            return Promise.resolve({ ok: true});
        }

        if (opcoesFetch?.method === "POST") {
            const novoEquipamento = JSON.parse(opcoesFetch.body);
            novoEquipamento.id = `Equipamento-${proximoId++}-A`;
            equipamentos.push(novoEquipamento);
            return Promise.resolve({ ok: true, json: () => Promise.resolve(novoEquipamento) });
        }

        let ehUrlBase = url.endsWith(URL_BASE);
        let ehUrlBaseComFiltro = url.includes('?filtro'); 
        if (ehUrlBase || ehUrlBaseComFiltro) {
            const urlParams = new URLSearchParams(url.split("?")[1]);
            const filtro = urlParams.get('filtro');
            if(filtro){
                const equipamentosFiltrados = equipamentos.filter(e => e.nome.includes(filtro));
                return Promise.resolve({ ok: true, json: () => Promise.resolve(equipamentosFiltrados) });
            }

            return Promise.resolve({ ok: true, json: () => Promise.resolve(equipamentos) });
        }
   
        if (url.endsWith("/tipos")) {
            return Promise.resolve({ ok: true, json: () => Promise.resolve(tipos) });
        }
        const id = url.split("/").pop();
        const equipamento = equipamentos.find(e => e.id === id);
        return Promise.resolve({ ok: true, json: () => Promise.resolve(equipamento) });
    }

    return Opa5.extend("ui5.testinvent.test.integration.Startup", {
        iStartMyApp: function (opcoes = {}) {
            window.fetch = mockFetch;
            this.iStartMyUIComponent({
                componentConfig: { name: "ui5.testinvent", async: true },
                hash: opcoes.hash,
                autoWait: true
            });
        },

        iTearDownMyApp: function () {
            window.fetch = undefined;
            equipamentos = [
                { id: "Equipamento-1-A", nome: "TesteA", tipo: 1, quantidadeEmEstoque: 10, dataDeInclusao: "2025-07-08T13:39:38.1443059Z", temEstoque: true },
                { id: "Equipamento-2-A", nome: "TesteB", tipo: 4, quantidadeEmEstoque: 0, dataDeInclusao: "2025-07-08T13:39:38.1443059Z", temEstoque: false }
            ];
            proximoId = ID_INICIAL_MOCK;
            return this.iTeardownMyUIComponent();
        }
    });
});