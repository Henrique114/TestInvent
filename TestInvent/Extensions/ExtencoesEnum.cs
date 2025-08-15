using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel;
using System.Reflection;
using TestInvent.Models;

namespace TestInvent.Extensions
{
    public static class ExtencoesEnum
    {
        public static string PegarDescrição(this Enum valor)
        {
            var campo = valor.GetType().GetField(valor.ToString());
            var atributo = (DescriptionAttribute)Attribute.GetCustomAttribute(campo, typeof(DescriptionAttribute));
            return atributo == null ? valor.ToString() : atributo.Description;
        }

        public static List<Enumerador> CriarListaDeTiposParaSelectDoFormulario<TEnum>() where TEnum : Enum
        {
            var listaDeItens = new List<Enumerador>();
            foreach (TEnum item in Enum.GetValues(typeof(TEnum)))
            {
                listaDeItens.Add(new Enumerador
                {
                    Chave = ((int)(object)item),
                    Descricao = item.PegarDescrição()
                });
            }
            return listaDeItens;
        }

    }
}
