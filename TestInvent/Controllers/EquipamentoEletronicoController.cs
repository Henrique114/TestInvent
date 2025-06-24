using Microsoft.AspNetCore.Mvc;
using TestInvent.Models;
using TestInvent.Repositories;

namespace TestInvent.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EquipamentoEletronicoController : ControllerBase
    {
        private readonly IRepository<EquipamentoEletronicoModel> _repository;

        public EquipamentoEletronicoController(IRepository<EquipamentoEletronicoModel> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<EquipamentoEletronicoModel>> GetAll()
        {
            return Ok(_repository.GetAll());
        }

        [HttpGet("{id}")]
        public ActionResult<EquipamentoEletronicoModel> GetById(string id)
        {
            var product = _repository.GetById(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public ActionResult<EquipamentoEletronicoModel> Create(EquipamentoEletronicoModel EquipamentoE)
        {
            _repository.Add(EquipamentoE);
            return CreatedAtAction(nameof(GetById), new { id = EquipamentoE.Id }, EquipamentoE);
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, EquipamentoEletronicoModel updateEquipamentoE)
        {
            var existing = _repository.GetById(id);
            if (existing == null)
            {
                return NotFound();
            }
            updateEquipamentoE.Id = id;
            _repository.Update(updateEquipamentoE);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var existing = _repository.GetById(id);
            if (existing == null)
            {
                return NotFound();
            }
            _repository.Delete(id);
            return NoContent();
        }
    }
}
