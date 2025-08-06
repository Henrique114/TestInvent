using Raven.Client.Documents;

namespace TestInvent.Data.RavenDB
{
    
    public interface IRavenDbContext
    {
        public static IDocumentStore Store;
        IDocumentStore CreateStore();
    }
}
