
using TestInvent.Models;
using TestInvent.Repositories;
namespace TestInvent.Test
{
    public class InMemoryRepositoryTests
    {
        private IRepository<EquipamentoEletronicoModel> _repo;

        public InMemoryRepositoryTests()
        {
            _repo = new InMemoryRepository<EquipamentoEletronicoModel>();
        }

        [Fact]
        public void Add_GetAll_TesteDeLançamentoDeItem()
        {
            var equipamento = new EquipamentoEletronicoModel { Nome = "Lenovo", Tipo = "notebook", QuantidadeEmEstoque = 10 };
            _repo.Add(equipamento);

            var list = _repo.GetAll().ToList();

            Assert.Single(list);
            Assert.Equal("Lenovo", list[0].Nome);
            Assert.Equal(10, list[0].QuantidadeEmEstoque);
        }

        [Fact]
        public void Update_ModificandoUmItem()
        {
            var equipamento = new EquipamentoEletronicoModel { Nome = "Logitech", Tipo = "teclado", QuantidadeEmEstoque = 5 };
            _repo.Add(equipamento);

            equipamento.Nome = "multilaser";
            _repo.Update(equipamento);

            var fetched = _repo.GetById(equipamento.Id);
            Assert.Equal("multilaser", fetched.Nome);
        }

        [Fact]
        public void Delete_RemovendoUmItem()
        {
            var equipamento = new EquipamentoEletronicoModel { Nome = "Inception", Tipo = "", QuantidadeEmEstoque = 10 };
            _repo.Add(equipamento);

            _repo.Delete(equipamento.Id);
            Assert.Null(_repo.GetById(equipamento.Id));
        }
    }
}