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
        public CreatedResult Adicionar([FromBody] CreateDTO createDTO)
        {
          
            
            _service.Adicionar(createDTO);

             return new CreatedResult();
        }

        [HttpPut("{id}")]
        public NoContentResult Atualizar([FromRoute] string id, [FromBody] UpdateDTO updateDTO)
        {
            _service.Atualizar(id, updateDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public NoContentResult Deletar([FromRoute] string id)
        {
            _service.Deletar(id);
            return NoContent();
        }
    }
}
