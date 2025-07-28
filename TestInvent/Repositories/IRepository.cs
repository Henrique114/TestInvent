namespace TestInvent.Repositories
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T? GetById(string id);

        IEnumerable<T> LookingFor(string nome);
        void Add(T entity);
        void Update(string id,T entity);
        void Delete(string id);
    }
}
