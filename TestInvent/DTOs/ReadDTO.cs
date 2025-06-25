using System.ComponentModel.DataAnnotations;

namespace TestInvent.DTOs
{
    public class ReadDTO
    {

        public string? Id { get; set; }

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
