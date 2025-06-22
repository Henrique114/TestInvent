using System.ComponentModel.DataAnnotations;
using TestInvent.Models.Interfaces;

namespace TestInvent.Models
{
    public class EquipamentoEletronicoModel : IEntity
    {
        public Guid Id { get; set; }
        [Required]
        public string nome { get; set; }
        [Required]
        public string tipo { get; set; }
        [Required]
        public int qntidadeEmEstoque { get; set; }
        [Required]
        public DateTime dataDeInclusao { get; set; }
        public bool temEmEstoque { get; } = false;
    }
}
