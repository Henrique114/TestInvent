sap.ui.define([
    "./mswHandlers"
], function(handlers) {
    "use strict";

    // Função para interceptar fetch e mockar respostas
    function interceptFetch() {
        const originalFetch = window.fetch;
        window.fetch = function(input, init) {
            const url = typeof input === "string" ? input : input.url;
            const method = (init && init.method) ? init.method.toUpperCase() : "GET";

            for (let i = 0; i < handlers.length; i++) {
                const h = handlers[i];
                const pathMatch = typeof h.path === "string"
                    ? h.path === url
                    : h.path instanceof RegExp && h.path.test(url);

                if (h.method === method && pathMatch) {
                    const responseData = h.handle({ url, method, init });
                    if (responseData && responseData.status) {
                        return Promise.resolve(new Response(null, { status: responseData.status }));
                    }
                    return Promise.resolve(new Response(JSON.stringify(responseData), {
                        status: 200,
                        headers: { "Content-Type": "application/json" }
                    }));
                }
            }
            // Se não encontrar handler, chama o fetch original
            return originalFetch(input, init);
        };
    }

    interceptFetch();
});