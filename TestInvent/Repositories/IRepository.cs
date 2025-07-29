namespace TestInvent.Repositories
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> BuscarTodos(string nome);
        T? BuscarPorId(string id);
        void Adicionar(T entity);
        void Atualizar(string id,T entity);
        void Deletar(string id);
    }
}
