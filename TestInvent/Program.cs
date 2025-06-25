
using TestInvent.Data;
using TestInvent.Models;
using TestInvent.Repositories;

namespace TestInvent
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Obtém as variáveis de ambiente diretamente do sistema
            var mongoConnectionString = Environment.GetEnvironmentVariable("MongoSettings__ConnectionString");
            var databaseName = Environment.GetEnvironmentVariable("MongoSettings__DatabaseName");

            if (string.IsNullOrWhiteSpace(mongoConnectionString) || string.IsNullOrWhiteSpace(databaseName))
            {
                throw new Exception("As variáveis de ambiente MongoSettings__ConnectionString e MongoSettings__DatabaseName precisam estar definidas.");
            }

            // Registra o contexto Mongo
            builder.Services.AddSingleton(sp => new MongoDbContext(mongoConnectionString, databaseName));

            // Registra o repositório genérico
            builder.Services.AddScoped(typeof(IRepository<>), typeof(MongoDbRepository<>));

            // Add services to the container.
           
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
