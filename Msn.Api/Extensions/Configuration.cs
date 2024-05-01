using FluentValidation;
using Msn.Api.Data;
using Msn.Api.DTOs;
using Msn.Api.Repositories;
using Msn.Api.Validators;

namespace Msn.Api.Extensions;
public static class Configuration
{
    public static void RegisterServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddDbContext<DataContext>();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddOpenApiDocument(config =>
        {
            config.DocumentName = "MsnAPI";
            config.Title = "MsnAPI v1";
            config.Version = "v1";
        });
        builder.Services.AddSignalR();
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(
                builder =>
                {
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
        });
        builder.Services.AddScoped<IValidator<UserRegisterDTO>, UserRegisterValidator>();
        builder.Services.AddScoped<MessageRepository>();
        builder.Services.AddOutputCache();
    }

    public static void RegisterMiddlewares(this WebApplication app)
    {
        app.UseCors();

        if (app.Environment.IsDevelopment())
        {
            app.UseOpenApi();
            app.UseSwaggerUi(config =>
            {
                config.DocumentTitle = "MsnAPI";
                config.Path = "/swagger";
                config.DocumentPath = "/swagger/{documentName}/swagger.json";
                config.DocExpansion = "list";
            });
        }

    }
}