using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using TestInvent.Data;
using TestInvent.DTOs;
using TestInvent.Models;
using TestInvent.Repositories;
using TestInvent.Service;

namespace TestInvent.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EquipamentoEletronicoController : ControllerBase
    {
        private readonly ServiceEquipamentoEletronico _service;

        public EquipamentoEletronicoController(ServiceEquipamentoEletronico service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ReadDTO>> GetAll()
        {
            var equipamentos = _service.GetAll()
            .Select( equipamento => new ReadDTO
            {
                Id = equipamento.Id,

                Nome = equipamento.Nome,

                Tipo = equipamento.Tipo,

                QuantidadeEmEstoque = equipamento.QuantidadeEmEstoque,

                DataDeInclusao = equipamento.DataDeInclusao,

                TemEmEstoque = equipamento.TemEmEstoque
            });
            return Ok(equipamentos);
        }

        [HttpGet("{id}")]
        public ActionResult<EquipamentoEletronicoModel> GetById(string id)
        {
            var equipamento = _service.GetById(id);
            if (equipamento == null)
            {
                return NotFound();
            }
            return Ok(new ReadDTO
            {
                Id = equipamento.Id,

                Nome = equipamento.Nome,

                Tipo = equipamento.Tipo,

                QuantidadeEmEstoque = equipamento.QuantidadeEmEstoque,

                DataDeInclusao = equipamento.DataDeInclusao,

                TemEmEstoque =  equipamento.TemEmEstoque
            });
        }

        [HttpGet("/lookingfor")]
        public ActionResult<IEnumerable<ReadDTO>> LookingFor([FromQuery] string nome)
        {
            if (string.IsNullOrEmpty(nome))
            {
                return BadRequest("O par�metro 'nome' � obrigat�rio.");
            }
            var equipamentos = _service.LookingFor(nome)
            .Select(equipamento => new ReadDTO
            {
                Id = equipamento.Id,
                Nome = equipamento.Nome,
                Tipo = equipamento.Tipo,
                QuantidadeEmEstoque = equipamento.QuantidadeEmEstoque,
                DataDeInclusao = equipamento.DataDeInclusao,
                TemEmEstoque = equipamento.TemEmEstoque
            });
            return Ok(equipamentos);
        }

        [HttpPost]
        public ActionResult<EquipamentoEletronicoModel> Create(CreateDTO createDTO)
        {
            var equipamento = new EquipamentoEletronicoModel
            {

                Nome = createDTO.Nome,

                Tipo = createDTO.Tipo,

                QuantidadeEmEstoque = createDTO.QuantidadeEmEstoque,

                DataDeInclusao = createDTO.DataDeInclusao,

            };
            
            _service.Add(equipamento);

            var result = new ReadDTO
            {
                Id = equipamento.Id,

                Nome = equipamento.Nome,

                Tipo = equipamento.Tipo,

                QuantidadeEmEstoque = equipamento.QuantidadeEmEstoque,

                DataDeInclusao = equipamento.DataDeInclusao,

                TemEmEstoque = equipamento.TemEmEstoque
            };
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, UpdateDTO updateDTO)
        {
            var existing = _service.GetById(id);
            if (existing == null)
            {
                return NotFound();
            }

            existing.Nome = updateDTO.Nome;

            existing.Tipo = updateDTO.Tipo;

            existing.QuantidadeEmEstoque = updateDTO.QuantidadeEmEstoque;


            _service.Update(id, existing);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var existing = _service.GetById(id);
            if (existing == null)
            {
                return NotFound();
            }
            _service.Delete(id);
            return NoContent();
        }
    }
}
