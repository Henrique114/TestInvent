
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using System.Web;
using TestInvent.DTOs;
using TestInvent.Models;


namespace TestInvent.Repositories
{
    public class RavenRepository : IRepository 
    {
        private readonly IDocumentStore _store = RavenDbContext.Store;


       
        public void Adicionar(EquipamentoEletronicoModel entity)
        {
            using var session = _store.OpenSession();

            session.Store(entity);
            session.SaveChanges();
        }

        public void Deletar(string id)
        {
            using var session = _store.OpenSession();

            id = HttpUtility.UrlDecode(id);
            var equipamento = BuscarPorId(id);

            session.Delete(equipamento);
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
            var idDecodificado = HttpUtility.UrlDecode(id);

            return session.Load<EquipamentoEletronicoModel>(idDecodificado) ?? throw new Exception("");
        }

        public void Atualizar(string id, EquipamentoEletronicoModel entity)
        {
            using var session = _store.OpenSession();

            id = HttpUtility.UrlDecode(id);
            var equipamento = BuscarPorId(id);

            equipamento.Nome = entity.Nome;
            equipamento.Tipo = entity.Tipo;
            equipamento.QuantidadeEmEstoque = entity.QuantidadeEmEstoque;

            session.SaveChanges();
        }
    }
}
