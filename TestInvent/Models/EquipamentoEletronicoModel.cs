using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TestInvent.Models
{
    public class EquipamentoEletronicoModel : IEntity
    {

        public string? Id { get; set; }

        public string? Nome { get; set; }

        public string? Tipo { get; set; }

        public int? QuantidadeEmEstoque { get; set; }

        public DateTimeOffset DataDeInclusao { get; set; }

        public string? Descricao { get; set; }

        public bool TemEmEstoque { get { return QuantidadeEmEstoque > 0; } }

       


    }
}
