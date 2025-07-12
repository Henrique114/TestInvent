using System.Security.Cryptography.X509Certificates;
using Raven.Client.Documents;

public class RavenDbContext
{
    public IDocumentStore Store { get; }

    public RavenDbContext(IConfiguration config)
    {
        var base64Cert = config["CertificadoBase64"];
        var password = config[""];
        var certBytes = Convert.FromBase64String(base64Cert);

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

