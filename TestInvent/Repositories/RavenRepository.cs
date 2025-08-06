
using AutoMapper;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using TestInvent.DTOS;
using TestInvent.Extensions;
using TestInvent.Models;


namespace TestInvent.Repositories
{
    public class RavenRepository : IRepository 
    {
        private readonly IDocumentStore _store = RavenDbContext.Store;
        private readonly IMapper _mapper;

        public RavenRepository(IMapper mapper)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public void Adicionar(EquipamentoEletronicoModel entity)
        {  
            using var session = _store.OpenSession();

            entity.Tipo = entity.Tipo;

            session.Store(entity);
            session.SaveChanges();
        }

        public void Deletar(string id)
        {
            using var session = _store.OpenSession();
            var equipamento = session.Load<EquipamentoEletronicoModel>(id) ?? throw new Exception($"Equipamento com {id} não encontrado");
            session.Delete(equipamento);
            session.SaveChanges();
        }

        public IEnumerable<LerDTO> BuscarTodos(string filtro)
        {
            using var session = _store.OpenSession();
            var query = session.Query<EquipamentoEletronicoModel>();

            if (!string.IsNullOrEmpty(filtro))
                query = query.Where(equipamento => equipamento.Nome.StartsWith(filtro));

            // Exemplo de uso do AutoMapper 
            var equipamentos = query.ToList();

            Console.WriteLine($"Equipamentos encontrados: {equipamentos}");

            var equipamentoDTOs = _mapper.Map<IEnumerable<LerDTO>>(equipamentos);

            return (IEnumerable<LerDTO>)equipamentoDTOs;
        }

        public EquipamentoEletronicoModel? BuscarPorId(string id)
        {
            using var session = _store.OpenSession();

            return session.Load<EquipamentoEletronicoModel>(id.DecodificarURL()) ?? throw new Exception($"Equipamento com {id} não encontrado");
        }

        public void Atualizar(string id, EquipamentoEletronicoModel entity)
        {
            using var session = _store.OpenSession();
            
            var equipamento = session.Load<EquipamentoEletronicoModel>(id) ?? throw new Exception($"Equipamento com {id} não encontrado"); ;

            equipamento.Nome = entity.Nome;
            equipamento.Tipo = entity.Tipo;
            equipamento.QuantidadeEmEstoque = entity.QuantidadeEmEstoque;
            equipamento.Descricao = entity.Descricao;

            session.SaveChanges();
        }
    }
}
