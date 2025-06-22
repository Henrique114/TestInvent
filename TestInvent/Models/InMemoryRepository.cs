using TestInvent.Models.Interfaces;


namespace TestInvent.Models
{
    public class InMemoryRepository<T> : IRepository<T> where T : class, IEntity
    {
        private readonly List<T> _items = new();

        public IEnumerable<T> ListAllEvents() => _items;

        public T GetById(Guid id) => _items.SingleOrDefault(x => x.Id == id);

        public void AddEvent(T entity)
        {
            entity.Id = Guid.NewGuid();
            _items.Add(entity);
        }

        public void Update(T entity)
        {
            Delete(entity.Id);
            _items.Add(entity);
        }

        public void Delete(Guid id)
        {
            var existing = GetById(id);
            if (existing != null) _items.Remove(existing);
        }
    } 
   
}
