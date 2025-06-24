using MongoDB.Driver;
using TestInvent.Models;

namespace TestInvent.Repositories
{
    public class MongoDbRepository<T> : IRepository<T> where T : class, IEntity
    {
        protected readonly IMongoCollection<T> _collection;

        public MongoDbRepository(IMongoDatabase database, string collectionName)
        {
            _collection = database.GetCollection<T>(collectionName);
        }

        public IEnumerable<T> GetAll()
        {
            return _collection.Find(_ => true).ToList();
        }

        public T? GetById(string id)
        {
            return _collection.Find(x => x.Id == id).FirstOrDefault();
        }

        public void Add(T entity)
        {
            _collection.InsertOne(entity);
        }

        public void Update(T entity)
        {
            _collection.ReplaceOne(x => x.Id == entity.Id, entity);
        }

        public void Delete(string id)
        {
            _collection.DeleteOne(x => x.Id == id);
        }
    } 
   
}
