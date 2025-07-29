

using TestInvent.Models;

namespace TestInvent.Repositories
{
    public class InMemoryRepository<T> : IRepository<T> where T : class, IEntity
    {
        private readonly List<T> _items = new();

        
        public IEnumerable<T> BuscarTodos(string nome) => _items;

        public T? BuscarPorId(string? id) => _items.SingleOrDefault(x => x.Id == id);

        public void Adicionar(T entity)
        {
            entity.Id = Guid.NewGuid().ToString();
            _items.Add(entity);
        }

        public void Atualizar(string id, T entity)
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
