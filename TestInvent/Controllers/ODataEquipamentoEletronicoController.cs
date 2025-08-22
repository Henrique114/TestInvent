using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using TestInvent.Data;

namespace TestInvent.Controllers
{
    public class ODataEquipamentoEletronicoController
    {
        [Route("odata/[controller]")]
        public class EquipamentoEletronicoController : ODataController
        {
            [EnableQuery]
            [HttpGet]
            public IActionResult Get()
            {
                return Ok(EquipamentoData.GetEquipamentos());
            }
        }
    }
}
