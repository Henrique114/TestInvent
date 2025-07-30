using Raven.Client.Documents;

public class RavenDbContext
{
    private static Lazy<IDocumentStore> _store = new Lazy<IDocumentStore>(CreateStore);
    public static IDocumentStore Store => _store.Value;

    private static IDocumentStore CreateStore()
    {
        

        IDocumentStore store = new DocumentStore()
        {
            Urls = new[] { Environment.GetEnvironmentVariable("RavenDbUrl")
        },
            Database = "Inventario",
            
        }.Initialize();
        return store;
    }
}

