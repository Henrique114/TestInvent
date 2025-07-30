
using Raven.Client.Documents;
using System.Web;
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

            var idDecodificado = HttpUtility.UrlDecode(id);
            session.Delete(idDecodificado);
            session.SaveChanges();
        }

        public IEnumerable<EquipamentoEletronicoModel> BuscarTodos(string nome)
        {
            using var session = _store.OpenSession();
            var query = !String.IsNullOrEmpty(nome) ? session.Query<EquipamentoEletronicoModel>().Where(x => x.Nome.StartsWith(nome)) : session.Query<EquipamentoEletronicoModel>();
            
            return query.ToList();
        }

        public EquipamentoEletronicoModel? BuscarPorId(string id)
        {
            using var session = _store.OpenSession();
            var idDecodificado = HttpUtility.UrlDecode(id);

            
            return session.Load<EquipamentoEletronicoModel>(idDecodificado);
        }

        public void Atualizar(string id, EquipamentoEletronicoModel entity)
        {
           
            using var session = _store.OpenSession();

            var idDecodificado = HttpUtility.UrlDecode(id);
            session.Store(entity, idDecodificado);
            session.SaveChanges();
        }
    }
}
