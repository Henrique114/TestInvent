import { rest } from 'https://unpkg.com/msw@latest/lib/index.mjs';
// Mock para GET /EquipamentoEletronico
export const handlers = [
    rest.get('/EquipamentoEletronico', (req, res, ctx) => {
        // Você pode importar o mockdata ou definir aqui
        return res(
            ctx.status(200),
            ctx.json([
                {
                    id: "1",
                    nome: "Notebook",
                    tipo: 1,
                    quantidadeEmEstoque: 10,
                    dataDeInclusao: "2023-08-01T00:00:00Z",
                    descricao: "Notebook Dell",
                    temEmEstoque: true
                },
                // ...outros equipamentos
            ])
        );
    }),
    // Mock para GET /EquipamentoEletronico/tipos
    rest.get('/EquipamentoEletronico/tipos', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                { id: 1, descricao: "Notebook" },
                { id: 2, descricao: "Monitor" }
            ])
        );
    }),
    // Mock para GET /EquipamentoEletronico/:id
    rest.get('/EquipamentoEletronico/:id', (req, res, ctx) => {
        const { id } = req.params;
        return res(
            ctx.status(200),
            ctx.json({
                id,
                nome: "Notebook",
                tipo: 1,
                quantidadeEmEstoque: 10,
                dataDeInclusao: "2023-08-01T00:00:00Z",
                descricao: "Notebook Dell",
                temEmEstoque: true
            })
        );
    }),
    // Mock para POST /EquipamentoEletronico
    rest.post('/EquipamentoEletronico', (req, res, ctx) => {
        // Retorne o objeto criado ou apenas status
        return res(ctx.status(201));
    }),
    // Mock para PUT /EquipamentoEletronico/:id
    rest.put('/EquipamentoEletronico/:id', (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    // Mock para DELETE /EquipamentoEletronico/:id
    rest.delete('/EquipamentoEletronico/:id', (req, res, ctx) => {
        return res(ctx.status(204));
    })
];