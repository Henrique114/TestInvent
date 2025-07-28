using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TestInvent.Models
{
    public class EquipamentoEletronicoModel : IEntity
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("nome")]
        [Required]
        public string? Nome { get; set; }

        [BsonElement("tipo")]
        [Required]
        public String? Tipo { get; set; }

        [BsonElement("quantidade_em_estoque")]
        [Required]
        public int? QuantidadeEmEstoque { get; set; }

        [BsonElement("data_de_inclusao")]
        [Required]
        public string? DataDeInclusao { get; set; }

        [BsonElement("tem_em_estoquw")]
        public bool TemEmEstoque { get { return QuantidadeEmEstoque > 0; } }

       


    }
}
