using MongoDB.Driver;

namespace TestInvent.Data.MongoDB
{
    public interface IMongoDbContext
    {
        IMongoCollection<T> GetCollection<T>();
    }
}
