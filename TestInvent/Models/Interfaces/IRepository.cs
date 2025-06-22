namespace TestInvent.Models.Interfaces
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> ListAllEvents();
        T GetById(Guid id);
        void AddEvent(T entity);
        void Update(T entity);
        void Delete(Guid id);
    }
}
