using System.Collections.Generic;
using System.Linq;
using TestInvent.Models;

namespace TestInvent.Data
{
    public class EquipamentoData
    {
        private static List<EquipamentoEletronicoModel> _equipamentos = new List<EquipamentoEletronicoModel>
        {
            new() { Id = "1", Nome = "Dell", Tipo = (EnumeracaoTipos?)1, QuantidadeEmEstoque = 10, DataDeInclusao = new DateTimeOffset(), Descricao= "uma breve descrição" },
            new() { Id = "2", Nome = "Dell", Tipo = (EnumeracaoTipos?)1, QuantidadeEmEstoque = 10, DataDeInclusao = new DateTimeOffset(), Descricao= "uma breve descrição" }
        };

        public static IQueryable<EquipamentoEletronicoModel> GetEquipamentos() => _equipamentos.AsQueryable();
    }
}
