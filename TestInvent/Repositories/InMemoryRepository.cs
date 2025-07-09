

using TestInvent.Models;

namespace TestInvent.Repositories
{
    public class InMemoryRepository<T> : IRepository<T> where T : class, IEntity
    {
        private readonly List<T> _items = new();

        
        public IEnumerable<T> GetAll() => _items;

        public T GetById(string? id) => _items.SingleOrDefault(x => x.Id == id);

        public void Add(T entity)
        {
            entity.Id = Guid.NewGuid().ToString();
            _items.Add(entity);
        }

        public void Update(T entity)
        {
            _items[ _items.FindIndex(item => item.Id == entity.Id)] = entity;
        }

        public void Delete(string? id)
        {
            var existing = GetById(id);
            if (existing != null) _items.Remove(existing);
        }
    }
  
}
