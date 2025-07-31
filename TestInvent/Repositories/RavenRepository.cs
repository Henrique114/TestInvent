
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using TestInvent.Extensions;
using TestInvent.Models;


namespace TestInvent.Repositories
{
    public class RavenRepository : IRepository 
    {
        private readonly IDocumentStore _store = RavenDbContext.Store;


       
        public void Adicionar(EquipamentoEletronicoModel entity)
        {
            
            using var session = _store.OpenSession();
            entity.Id = null;
            session.Store(entity);
            session.SaveChanges();
        }

        public void Deletar(string id)
        {
            using var session = _store.OpenSession();
            session.Delete(id);
            session.SaveChanges();
        }

        public IEnumerable<EquipamentoEletronicoModel> BuscarTodos(string filtro)
        {
            using var session = _store.OpenSession();
            var query = session.Query<EquipamentoEletronicoModel>();

            if (!string.IsNullOrEmpty(filtro))
                query = query.Where(equipamento => equipamento.Nome.StartsWith(filtro));

            return query.ToList();
        }

        public EquipamentoEletronicoModel? BuscarPorId(string id)
        {
            using var session = _store.OpenSession();

            return session.Load<EquipamentoEletronicoModel>(id.DecodificarURL()) ?? throw new Exception("Erro ao decodificar o id do equipamento");
        }

        public void Atualizar(string id, EquipamentoEletronicoModel entity)
        {
            using var session = _store.OpenSession();

            
            var equipamento = BuscarPorId(id.DecodificarURL());

            equipamento.Nome = entity.Nome;
            equipamento.Tipo = entity.Tipo;
            equipamento.QuantidadeEmEstoque = entity.QuantidadeEmEstoque;

            session.SaveChanges();
        }
    }
}
