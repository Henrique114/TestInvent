

using TestInvent.Models;

namespace TestInvent.Repositories
{
    public class InMemoryRepository : IRepository
    {
        private readonly List<EquipamentoEletronicoModel> _items = new()  {
                                                                        new()
                                                                        {
                                                                            Id = "id-teste",
                                                                            DataDeInclusao = new DateTime(),
                                                                            Nome = "Item abobora",
                                                                            QuantidadeEmEstoque = 15,
                                                                            Tipo = EnumeracaoTipos.Notebook
                                                                        }
                                                                    };


        public IEnumerable<EquipamentoEletronicoModel> BuscarTodos(string nome) => _items;

        public EquipamentoEletronicoModel? BuscarPorId(string? id) => _items.SingleOrDefault(x => x.Id == id);

        public void Adicionar(EquipamentoEletronicoModel entity)
        {
            entity.Id = Guid.NewGuid().ToString();
            _items.Add(entity);
        }

        public void Atualizar(string id, EquipamentoEletronicoModel entity)
        {
            var a = _items.FindIndex(item => item.Id == id);
            try
            {
                _items[a] = entity;
            }
            catch (Exception ex)
            {

                Console.WriteLine("Ocorreu um erro ao atualizar: " + ex);
            }
        }

        public void Deletar(string? id)
        {
            var existing = BuscarPorId(id);
            if (existing != null)
            {
                _items.Remove(existing);
            }
            ;
        }
       
    }
  
}
