using System.Web;

namespace TestInvent.Extensions
{
    public static class DecodificadorDeStrings
    {
        public static string DecodificarURLString(string url) 
        {
            return HttpUtility.UrlDecode(url);
        }
    }
}
