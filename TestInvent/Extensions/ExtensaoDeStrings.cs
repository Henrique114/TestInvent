using System.Web;

namespace TestInvent.Extensions
{
    public static class ExtensaoDeStrings
    {
        public static string DecodificarURL(this string url)
        {
            return HttpUtility.UrlDecode(url);
        }
    }  
}
