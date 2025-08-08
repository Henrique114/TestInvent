using System.ComponentModel;

namespace TestInvent.Models
{
    public enum EnumeracaoTipos
    {
        [Description("Notebook")]
        Notebook = 1,

        [Description("Teclado")]
        Teclado = 2,

        [Description("Mouse")]
        Mouse = 3,

        [Description("Monitor")]
        Monitor = 4,

        [Description("Headset")]
        Headset = 5
    }
}
