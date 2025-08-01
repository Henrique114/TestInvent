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

RavenDB:

Para uso do RavenDB com certificado configurar a classe RavenDbContex, o código comentado já busca limpa e converte o certificado. Para criação do arquivo copie e cole seu conteúdo em um arquivo txt, crie uma variável de ambiente com o caminho para o arquivo txt e por fim, dentro do método de busca Environment.GetEnvironmentVariable(nomeVariavelCertificado), passe como parâmetro o nome da variável de ambiente.