sap.ui.define([
    "sap/ui/test/Opa5"
], function (Opa5) {
    "use strict";
    const ID_INICIAL_MOCK = 3;
    const URL_BASE = "/EquipamentoEletronico";
    
    let equipamentos = [
        { id: "Equipamento-1-A", nome: "TesteA", tipo: 1, quantidadeEmEstoque: 10, dataDeInclusao: "2025-08-25T13:39:38.1443059Z", temEmEstoque: true },
        { id: "Equipamento-2-A", nome: "TesteB", tipo: 4, quantidadeEmEstoque: 0, dataDeInclusao: "2025-08-25T13:39:38.1443059Z", temEmEstoque: false }
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
    
   
    let i18nModel = new sap.ui.model.resource.ResourceModel({ 
    bundleUrl : "../i18n/i18n.properties" });
    let oBundle = i18nModel.getResourceBundle();
        
    function mockFetch(url, opcoesFetch) {
        const _url = url;
        const metodo = opcoesFetch?.method;
        switch (metodo) {
            case "POST":
                return adicionar(opcoesFetch);
            case "PUT":
                return atualizar(_url , opcoesFetch);
            case "DELETE":
                return deletar(_url);
            default:
                return identificarBuscaPeloEndPoint(_url);
        }
    }

    function identificarBuscaPeloEndPoint(url){
        
        let ehUrlBase = url.endsWith(URL_BASE);
        const parametroFiltroUrl = "?filtro"
        let ehUrlBaseComFiltro = url.includes(parametroFiltroUrl); 

        if (ehUrlBase || ehUrlBaseComFiltro) {
           return _buscarEquipamentos(url);
        }
   
        if (url.endsWith("/tipos")) {
            return _pegarListaTiposEquipamento(url);
        }
        
        return _buscarPorId(url);
    }

    function _buscarEquipamentos(url){
        const urlParams = new URLSearchParams(url.split("?")[1]);
        const filtro = urlParams.get('filtro');
        if(filtro){
            const equipamentosFiltrados = equipamentos.filter(e => e.nome.includes(filtro));
            return Promise.resolve({ ok: true, json: () => Promise.resolve(equipamentosFiltrados) });
        }

        return Promise.resolve({ ok: true, json: () => Promise.resolve(equipamentos) });
    }

    function _buscarPorId(url){
        const id = url.split("/").pop();
        const equipamento = equipamentos.find(e => e.id === id);
        return Promise.resolve({ ok: true, json: () => Promise.resolve(equipamento) });
    }

    function _pegarListaTiposEquipamento(){
        return Promise.resolve({ ok: true, json: () => Promise.resolve(tipos) });
    }

    function adicionar(opcoesFetch){
        const novoEquipamento = JSON.parse(opcoesFetch.body);
        novoEquipamento.id = `Equipamento-${proximoId++}-A`;
        novoEquipamento.dataDeInclusao = new Date();
        equipamentos.push(novoEquipamento);
        return Promise.resolve({ ok: true, json: () => Promise.resolve(novoEquipamento) });
    }

    function atualizar(url , opcoesFetch){
        const id = url.split("/").pop();
        const novoEquipamento = JSON.parse(opcoesFetch.body);
       
        let a = equipamentos.findIndex(equipamento => equipamento.id == id);
        try
        {
            equipamentos[a] = novoEquipamento;
        }
        catch (error) {
            console.error(oBundle.getText("msgErrorAtualizar", error.message));
        }

        
        return Promise.resolve({ ok: true, json: () => Promise.resolve(novoEquipamento) });
    }
    
    function deletar(url){
        const id = url.split("/").pop();
        if (id) { 
            var resultadoAposRemocao = equipamentos.filter((item) => item.id !== id); 
            equipamentos = resultadoAposRemocao;
        }
        return Promise.resolve({ ok: true});
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
            return this.iTeardownMyUIComponent();
        }
    });
});