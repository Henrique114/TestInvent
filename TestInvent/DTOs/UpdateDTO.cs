using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TestInvent.DTOs
{
    public class UpdateDTO
    {

        [Required]
        public string? Nome { get; set; }

        [Required]
        public string? Tipo { get; set; }

        [Required]
        public int? QuantidadeEmEstoque { get; set; }

        [Required]
        public DateTime DataDeInclusao { get; set; }

        public bool TemEmEstoque { get; set; }
    }
}
