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

        public static List<Enumerador<T>> CriarListaDeTiposParaSelectDoFormulario<T>() where T : new()
        {
            var listaDeItens = new List<Enumerador<T>>();

            foreach (var item in Enum.GetValues(typeof(T)))
            {
                listaDeItens.Add(new Enumerador<T>
                {
                    Chave = (T)item,
                    Descricao = ((Enum)item).PegarDescrição()
                });
            }
            return listaDeItens;
        }

    }
}
