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
        public OkObjectResult BuscarTodos([FromQuery] string nome = null)
        {
            var equipamentos = _service.BuscarTodos(nome);
            return Ok(equipamentos);
        }

        [HttpGet("{id}")]
        public OkObjectResult BuscarPorId([FromRoute] string id)
        {
            var equipamento = _service.BuscarPorId(id);
           
            return Ok(equipamento);
        }

        [HttpPost]
        public CreatedResult Adicionar([FromBody]CreateDTO createDTO)
        {
          
            
            _service.Adicionar(createDTO);

             return new CreatedResult();
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(string id, UpdateDTO updateDTO)
        {
            var existing = _service.BuscarPorId(id);
            if (existing == null)
            {
                return NotFound();
            }

            existing.Nome = updateDTO.Nome;

            existing.Tipo = updateDTO.Tipo;

            existing.QuantidadeEmEstoque = updateDTO.QuantidadeEmEstoque;


            _service.Atualizar(id, existing);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(string id)
        {
            var existing = _service.BuscarPorId(id);
            if (existing == null)
            {
                return NotFound();
            }
            _service.Deletar(id);
            return NoContent();
        }
    }
}
