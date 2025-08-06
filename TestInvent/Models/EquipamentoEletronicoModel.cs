
namespace TestInvent.Models
{
    public class EquipamentoEletronicoModel : IEntity
    {

        public string? Id { get; set; }

        public string? Nome { get; set; }

       public Tipos? Tipo { get; set; }

        public int? QuantidadeEmEstoque { get; set; }

        public DateTimeOffset DataDeInclusao { get; set; }

        public string? Descricao { get; set; }

        public bool TemEmEstoque { get { return QuantidadeEmEstoque > 0; } }


        public enum Tipos
        {

            Notebook = 1,
            Teclado = 2,
            Mouse = 3,
            Monitor = 4,
            Headset = 5
          

        }



    }
}
