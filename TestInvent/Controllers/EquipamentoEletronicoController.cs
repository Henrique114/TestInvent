using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Extensions;
using TestInvent.Extensions;
using TestInvent.Models;
using TestInvent.Service;

namespace TestInvent.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EquipamentoEletronicoController : ControllerBase
    {
        private readonly EquipamentoEletronicoService _service;

        public EquipamentoEletronicoController(EquipamentoEletronicoService service)
        {
            _service = service;
        }

        [HttpGet]
        public OkObjectResult BuscarTodos([FromQuery] string? filtro)
        {
            var equipamentos = _service.BuscarTodos(filtro);

            return Ok(equipamentos);
        }

        [HttpGet("{id}")]
        public OkObjectResult BuscarPorId([FromRoute] string id)
        {
            var equipamento = _service.BuscarPorId(id);
           
            return Ok(equipamento);
        }

        [HttpPost]
        public CreatedResult Adicionar([FromBody] EquipamentoEletronicoModel equipamentoEletronico)
        {
            _service.Adicionar(equipamentoEletronico);
             return Created(equipamentoEletronico.Id, equipamentoEletronico);
        }

        [HttpPut("{id}")]
        public NoContentResult Atualizar([FromRoute] string id, [FromBody] EquipamentoEletronicoModel equipamentoEletronico)
        {
            _service.Atualizar(id, equipamentoEletronico);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public NoContentResult Deletar([FromRoute] string id)
        {
            _service.Deletar(id);
            return NoContent();
        }

        [HttpGet("tipos")]
        public OkObjectResult PegarListaTiposEquipamento()
        {
            var listaParaFrontEnd = ExtencoesEnum.CriarListaDeTiposParaSelectDoFormulario<Tipos>();

            
            return Ok(listaParaFrontEnd);
        }
    }
}
