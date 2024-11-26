
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace Farm_API_Gateway
{
    public class Program
    {
        public  static async Task  Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthorization();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            //ocelot config
            builder.Configuration.SetBasePath(builder.Environment.ContentRootPath)
               .AddJsonFile("APIConfiguration.json", false, reloadOnChange: true);

          

            builder.Services.AddOcelot();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();
            await app.UseOcelot();
            app.MapGet("/Hello", () => "Welcome to Gateway");



            app.Run();
        }
    }
}
