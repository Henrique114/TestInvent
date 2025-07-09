using MongoDB.Driver;

namespace TestInvent.Data
{
    public interface IMongoDbContext
    {
        IMongoCollection<T> GetCollection<T>();
    }
}
