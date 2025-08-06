using System.Web;

namespace TestInvent.Extensions
{
    public static class ExtensaoDeStrings
    {
        public static string DecodificarURL(this string url)
        {
            return HttpUtility.UrlDecode(url);
        }


        public static string PrimeiraLetraEmCaixaAlta(this string text)
        {
            if (string.IsNullOrEmpty(text))
            {
                return text;
            }

            return char.ToUpper(text[0]) + text.Substring(1);
        }
    }  
}
