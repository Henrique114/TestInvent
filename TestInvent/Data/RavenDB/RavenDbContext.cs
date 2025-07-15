using System.Security.Cryptography.X509Certificates;
using Raven.Client.Documents;

public class RavenDbContext
{
    private static Lazy<IDocumentStore> store = new Lazy<IDocumentStore>(CreateStore);

    public static IDocumentStore Store => store.Value;

    private static IDocumentStore CreateStore()
    {
        //var caminhoCert = config["CertificadoBase64"];
        //var password = config[""];

        //if (!File.Exists(caminhoCert))
        //    throw new FileNotFoundException("Arquivo de certificado não encontrado.", caminhoCert);

        //// Leitura e limpeza
        //var base64Content = File.ReadAllText(caminhoCert)
        //    .Replace("\r", "")
        //    .Replace("\n", "")
        //    .Replace(" ", "")
        //    .Trim();

        //var certBytes = Convert.FromBase64String(base64Content);

        //var cert = new X509Certificate2(certBytes, password,
        //    X509KeyStorageFlags.MachineKeySet |
        //    X509KeyStorageFlags.PersistKeySet |
        //    X509KeyStorageFlags.Exportable);

        IDocumentStore store = new DocumentStore()
        {
            Urls = new[] { Environment.GetEnvironmentVariable("RavenDbUrl")
        },
            Database = Environment.GetEnvironmentVariable("RavenDbSettings"),
            //Certificate = cert
        }.Initialize();
        return store;
    }
}

