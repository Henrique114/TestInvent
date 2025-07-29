
using Raven.Client.Documents;
using System.Web;
using TestInvent.Models;


namespace TestInvent.Repositories
{
    public class RavenRepository<T> : IRepository<T> where T :  EquipamentoEletronicoModel
    {
        private readonly IDocumentStore _store = RavenDbContext.Store;


       
        public void Add(T entity)
        {

            using var session = _store.OpenSession();

            session.Store(entity);
            session.SaveChanges();
        }

        public void Delete(string id)
        {
            using var session = _store.OpenSession();
            var idDecodificado = HttpUtility.UrlDecode(id);
            session.Delete(idDecodificado);
            session.SaveChanges();
        }

        public IEnumerable<T> GetAll(string nome)
        {
            using var session = _store.OpenSession();
            if (nome != null && nome != string.Empty)
            {
                return session
                .Query<T>()
                .Where(x => x.Nome.StartsWith(nome))
                .ToList();
            }
            return session
                .Query<T>()
                .ToList();
        }

        public T? GetById(string id)
        {
            using var session = _store.OpenSession();
            var idDecodificado = HttpUtility.UrlDecode(id);
            return session.Load<T>(idDecodificado);
        }

        public void Update(string id, T entity)
        {
           
            using var session = _store.OpenSession();

            var idDecodificado = HttpUtility.UrlDecode(id);
            session.Store(entity, idDecodificado);
            session.SaveChanges();
        }
    }
}
