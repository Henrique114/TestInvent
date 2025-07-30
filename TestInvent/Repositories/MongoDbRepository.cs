using MongoDB.Driver;
using TestInvent.Data.MongoDB;
using TestInvent.Models;

namespace TestInvent.Repositories
{
    public class MongoDbRepository : IRepository
    {
        protected readonly IMongoCollection<EquipamentoEletronicoModel> _collection;
          
        public MongoDbRepository(IMongoDbContext contex)
        {
            
            _collection = contex.GetCollection<EquipamentoEletronicoModel>();
        }

        public IEnumerable<EquipamentoEletronicoModel> BuscarTodos(string nome)
        {
            return _collection.Find(_ => true).ToList();
        }

        public EquipamentoEletronicoModel? BuscarPorId(string id)
        {
            return _collection.Find(x => x.Id == id).FirstOrDefault();
        }

        public void Adicionar(EquipamentoEletronicoModel entity)
        {
            _collection.InsertOne(entity);
        }

        public void Atualizar(string id, EquipamentoEletronicoModel entity)
        {
            _collection.ReplaceOne(id, entity);
        }

        public void Deletar(string id)
        {
            _collection.DeleteOne(x => x.Id == id);
        }
       
    } 
   
}
