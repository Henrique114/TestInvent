
using FluentValidation;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.DependencyInjection;
using TestInvent.Data;
using TestInvent.Models;
using TestInvent.Repositories;
using TestInvent.Service;

namespace TestInvent
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
            var builder = WebApplication.CreateBuilder(args);


            // Add services to the container.
            builder.Services.AddScoped<IValidator<EquipamentoEletronicoModel>, EquipamentoEletronicoValidator>();

            // Registra o repositório genérico
            builder.Services.AddScoped<IRepository, RavenRepository>();
            builder.Services.AddScoped<EquipamentoEletronicoService>();
           
            //Registra o RavenContex(conecção com o banco)
            builder.Services.AddSingleton<RavenDbContext>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  policy =>
                                  {
                                      policy.WithOrigins("*");
                                  });
            });

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

            app.UseDefaultFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                ContentTypeProvider = new FileExtensionContentTypeProvider
                {
                    Mappings = { [".properties"] = "application/x-msdownload" }
                }
            });


            app.UseHttpsRedirection();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
