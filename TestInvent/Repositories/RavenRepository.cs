
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Raven.Client.Documents;
using TestInvent.Models;

namespace TestInvent.Repositories
{
    public class RavenRepository<T> : IRepository<T> where T : class
    {
        private readonly IDocumentStore _store;

        public RavenRepository(RavenDbContext context)
        {
            _store = context.Store;
            
        }
        public void Add(T entity)
        {

            using var session = _store.OpenSession();

            session.Store(entity);
             session.SaveChanges();
        }

        public void Delete(string id)
        {
            using var session = _store.OpenSession();
            session.Delete(id);
            session.SaveChanges();
        }

        public IEnumerable<T> GetAll()
        {
            using var session = _store.OpenSession();
            return session.Query<T>().ToList();
        }

        public T? GetById(string id)
        {
            using var session = _store.OpenSession();
            return session.Load<T>(id);
        }

        public void Update(string id, T entity)
        {
           
            using var session = _store.OpenSession();

             session.Store(entity, id);
             session.SaveChanges();
        }
    }
}
