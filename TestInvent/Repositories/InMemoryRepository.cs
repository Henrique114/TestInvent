

using TestInvent.Models;

namespace TestInvent.Repositories
{
    public class InMemoryRepository : IRepository
    {
        private readonly List<EquipamentoEletronicoModel> _items = new();

        
        public IEnumerable<EquipamentoEletronicoModel> BuscarTodos(string nome) => _items;

        public EquipamentoEletronicoModel? BuscarPorId(string? id) => _items.SingleOrDefault(x => x.Id == id);

        public void Adicionar(EquipamentoEletronicoModel entity)
        {
            entity.Id = Guid.NewGuid().ToString();
            _items.Add(entity);
        }

        public void Atualizar(string id, EquipamentoEletronicoModel entity)
        {
            _items[ _items.FindIndex(item => item.Id == entity.Id)] = entity;
        }

        public void Deletar(string? id)
        {
            var existing = BuscarPorId(id);
            if (existing != null) _items.Remove(existing);
        }
       
    }
  
}
