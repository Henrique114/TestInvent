using TestInvent.Models.Interfaces;


namespace TestInvent.Models
{
    public class InMemoryRepository<T> : IRepository<T> where T : class, IEntity
    {
        private readonly List<T> _items = new();

        public IEnumerable<T> ListarTodosOsEquipamentos() => _items;

        public T ListarEquipamentoPorId(Guid id) => _items.SingleOrDefault(x => x.Id == id);

        public void AdicionarEquipamento(T entity)
        {
            entity.Id = Guid.NewGuid();
            _items.Add(entity);
        }

        public void EditarEquipamento(T entity)
        {
            DeletarEquipamento(entity.Id);
            _items.Add(entity);
        }

        public void DeletarEquipamento(Guid id)
        {
            var existing = ListarEquipamentoPorId(id);
            if (existing != null) _items.Remove(existing);
        }
    } 
   
}
