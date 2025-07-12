# TestInvent



Nesta solução de API é possivel fazer a persistencia com o MongoDB, o qual ja esta implementada a classe de configuração da conexão e Repositorio. Necessitando apenas: 

    - Registrar os serviços de DI no conteiner na classe Program(singleton->IMongoDbContex, MongoDbContex && Scoped->IRepository, MongoDbRepository); 

    - refatorar o cnostrutor na Classe EquipamentoEletronicoController, passando por parametro o objeto MongoDBContex do tipo IMongoDbContex;

    - adicionar as variaveis de ambiente do sistema como: MongoSettings__ConnectionString e MongoSettings__DatabaseName respectivamnete.

Tambem é possivel fazer  persistencia dos dados utilizando o RavenDB. Necessitando apenas:
    - Registrar os serviços de DI no conteiner na classe Program(singleton-> RavenDbContex && Scoped->IRepository, RavenRepository);

    - refatorar o cnostrutor na Classe EquipamentoEletronicoController, passando por parametro o objeto MongoDBContex do tipo IMongoDbContex;

    - adicionar as variaveis de ambiente do sistema como: MongoSettings__ConnectionString e MongoSettings__DatabaseName respectivamnete.


Por padrão está implementado o Repositorio em memoria (INMemoryRepository) - apenas para testes.