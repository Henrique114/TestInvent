using Microsoft.AspNetCore.Mvc;
using TestInvent.Models;
using TestInvent.Models.Interfaces;

namespace TestInvent.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EquipamentoEletronicoController : ControllerBase
    {
        private readonly IRepository<EquipamentoEletronicoModel> _repo;

        public EquipamentoEletronicoController(IRepository<EquipamentoEletronicoModel> repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult ListarTodos() => Ok(_repo.ListarTodosOsEquipamentos());

        [HttpGet("{id}")]
        public IActionResult ListarPorId(Guid id)
        {
            var equipamento = _repo.ListarEquipamentoPorId(id);
            if (equipamento == null) return NotFound();
            return Ok(equipamento);
        }

        [HttpPost]
        public IActionResult Adicionar(EquipamentoEletronicoModel Equipamento)
        {
            _repo.AdicionarEquipamento(Equipamento);
            return CreatedAtAction(nameof(ListarPorId), new { id = Equipamento.Id }, Equipamento);
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(Guid id, EquipamentoEletronicoModel m)
        {
            if (_repo.ListarEquipamentoPorId(id) == null) return NotFound();
            m.Id = id;
            _repo.EditarEquipamento(m);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(Guid id)
        {
            if (_repo.ListarEquipamentoPorId(id) == null) return NotFound();
            _repo.DeletarEquipamento(id);
            return NoContent();
        }
    }
}
