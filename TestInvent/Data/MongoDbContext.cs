using MongoDB.Driver;

namespace TestInvent.Data
{
    public class MongoDbContext : IMongoDbContext
    {

        public IMongoDatabase Database { get; }

        public MongoDbContext()
        {
            // Obtém as variáveis de ambiente diretamente do sistema
            var mongoConnectionString = Environment.GetEnvironmentVariable("MongoSettings__ConnectionString");
            var databaseName = Environment.GetEnvironmentVariable("MongoSettings__DatabaseName");

            if (string.IsNullOrWhiteSpace(mongoConnectionString) || string.IsNullOrWhiteSpace(databaseName))
            {
                throw new Exception("As variáveis de ambiente MongoSettings__ConnectionString e MongoSettings__DatabaseName precisam estar definidas.");
            }
            var client = new MongoClient(mongoConnectionString);
            Database = client.GetDatabase(databaseName);
        }

        public IMongoCollection<EquipamentoEletronicoModel> GetCollection<EquipamentoEletronicoModel>()
        {
          return  Database.GetCollection<EquipamentoEletronicoModel>(typeof(EquipamentoEletronicoModel).Name.ToLower() + "s");
        }
    }
}
