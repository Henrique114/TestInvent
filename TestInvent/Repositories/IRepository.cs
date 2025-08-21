using Raven.Client.Documents.Session;
using TestInvent.Models;

namespace TestInvent.Repositories
{
    public interface IRepository
    {
        IEnumerable<EquipamentoEletronicoModel> BuscarTodos(string nome);
        EquipamentoEletronicoModel? BuscarPorId(string id, IDocumentSession session = null);
        void Adicionar(EquipamentoEletronicoModel entity);
        void Atualizar(string id,EquipamentoEletronicoModel entity);
        void Deletar(string id);
    }
}
