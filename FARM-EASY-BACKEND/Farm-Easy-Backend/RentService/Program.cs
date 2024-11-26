
using Microsoft.EntityFrameworkCore;
using RentService.DataAccess;
using RentService.Repository;

namespace RentService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddDbContext<RentalDBContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("RentalData")));

            builder.Services.AddScoped<IRentalRepository, RentalRepository>();
            builder.Services.AddScoped<RentalDBContext>();

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
