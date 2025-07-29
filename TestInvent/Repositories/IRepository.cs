namespace TestInvent.Repositories
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll(string nome);
        T? GetById(string id);
        void Add(T entity);
        void Update(string id,T entity);
        void Delete(string id);
    }
}
