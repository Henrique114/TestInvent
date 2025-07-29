using MongoDB.Driver;
using TestInvent.Data.MongoDB;
using TestInvent.Models;

namespace TestInvent.Repositories
{
    public class MongoDbRepository<T> : IRepository<T> where T : class, IEntity
    {
        protected readonly IMongoCollection<T> _collection;
          
        public MongoDbRepository(IMongoDbContext contex)
        {
            
            _collection = contex.GetCollection<T>();
        }

        public IEnumerable<T> BuscarTodos(string nome)
        {
            return _collection.Find(_ => true).ToList();
        }

        public T? BuscarPorId(string id)
        {
            return _collection.Find(x => x.Id == id).FirstOrDefault();
        }

        public void Adicionar(T entity)
        {
            _collection.InsertOne(entity);
        }

        public void Atualizar(string id, T entity)
        {
            _collection.ReplaceOne(id, entity);
        }

        public void Deletar(string id)
        {
            _collection.DeleteOne(x => x.Id == id);
        }
       
    } 
   
}
