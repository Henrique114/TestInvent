namespace TestInvent.Models.Interfaces
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> ListarTodosOsEquipamentos();
        T ListarEquipamentoPorId(Guid id);
        void AdicionarEquipamento(T entity);
        void EditarEquipamento(T entity);
        void DeletarEquipamento(Guid id);
    }
}
