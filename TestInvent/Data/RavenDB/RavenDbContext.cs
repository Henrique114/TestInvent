using System.Security.Cryptography.X509Certificates;
using Raven.Client.Documents;

public class RavenDbContext
{
    private static Lazy<IDocumentStore> _store = new Lazy<IDocumentStore>(CreateStore);
    public static IDocumentStore Store => _store.Value;

    private static IDocumentStore CreateStore()
    {
        const string nomeVariavelCertificado = "CertificadoBase64";
        var caminhoCertificadoRaven = Environment.GetEnvironmentVariable(nomeVariavelCertificado);

        if (!File.Exists(caminhoCertificadoRaven))
            throw new FileNotFoundException("Arquivo de certificado não encontrado.", caminhoCertificadoRaven);

        // Leitura e limpeza
        var base64Content = File.ReadAllText(caminhoCertificadoRaven)
            .Replace("\r", "")
            .Replace("\n", "")
            .Replace(" ", "")
            .Trim();

        var certBytes = Convert.FromBase64String(base64Content);

        var cert = new X509Certificate2(certBytes, string.Empty,
            X509KeyStorageFlags.MachineKeySet |
            X509KeyStorageFlags.PersistKeySet |
            X509KeyStorageFlags.Exportable);

        IDocumentStore store = new DocumentStore()
        {
            Urls = new[] { Environment.GetEnvironmentVariable("RavenDbUrl")
        },
            Database = "Inventario",
            Certificate = cert
        }.Initialize();
        return store;
    }
}

