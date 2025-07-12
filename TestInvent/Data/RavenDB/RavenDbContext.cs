using System.Security.Cryptography.X509Certificates;
using Raven.Client.Documents;

public class RavenDbContext
{
    public IDocumentStore Store { get; }

    public RavenDbContext(IConfiguration config)
    {
        var caminhoCert = config["CertificadoBase64"];
        var password = config[""];

        if (!File.Exists(caminhoCert))
            throw new FileNotFoundException("Arquivo de certificado não encontrado.", caminhoCert);

        // Leitura e limpeza
        var base64Content = File.ReadAllText(caminhoCert)
            .Replace("\r", "")
            .Replace("\n", "")
            .Replace(" ", "")
            .Trim();

        var certBytes = Convert.FromBase64String(base64Content);

        var cert = new X509Certificate2(certBytes, password,
            X509KeyStorageFlags.MachineKeySet |
            X509KeyStorageFlags.PersistKeySet |
            X509KeyStorageFlags.Exportable);

        Store = new DocumentStore
        {
            Urls = new[] { config["RavenDbUrl"] },
            Database = config["RavenDbDataBase"],
            Certificate = cert
        };
        Store.Initialize();
    }
}

