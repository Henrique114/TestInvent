
using Microsoft.Extensions.DependencyInjection;
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

            //Registra o RavenContex(conecção com o banco)
            builder.Services.AddSingleton<RavenDbContext>();

            // Registra o repositório genérico
            builder.Services.AddScoped<IRepository<EquipamentoEletronicoModel>, RavenRepository<EquipamentoEletronicoModel>>();

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
