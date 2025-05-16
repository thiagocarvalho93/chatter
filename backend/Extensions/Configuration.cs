using System.Text;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Msn.Api.Data;
using Msn.Api.DTOs;
using Msn.Api.Repositories;
using Msn.Api.Services;
using Msn.Api.Validators;

namespace Msn.Api.Extensions;

public static class Configuration
{
    public static void RegisterServices(this WebApplicationBuilder builder)
    {
        var config = builder.Configuration;

        var key = config["Jwt:Key"] ?? "default-secret-key";
        var issuer = config["Jwt:Issuer"];
        var audience = config["Jwt:Audience"];

        builder.Services.AddAuthorization();
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                // ValidateIssuerSigningKey = true,
                ValidIssuer = issuer,
                ValidAudience = audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
            };

            options.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    var accessToken = context.Request.Query["access_token"];

                    System.Console.WriteLine(accessToken);
                    var path = context.HttpContext.Request.Path;
                    if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chat"))
                    {
                        context.Token = accessToken;
                    }
                    return Task.CompletedTask;
                }
            };
        });
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
                        .WithOrigins([
                            "http://localhost:3000",
                            "https://chatter-mu-wine.vercel.app",
                            "https://chatter-api.space"])
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
        });
        builder.Services.AddScoped<IValidator<UserRegisterDTO>, UserRegisterValidator>();
        builder.Services.AddScoped<MessageRepository>();
        builder.Services.AddScoped<TokenService>();
        builder.Services.AddSingleton<ConnectionManager>();
        builder.Services.AddOutputCache();
    }

    public static void RegisterMiddlewares(this WebApplication app)
    {
        app.UseAuthorization();
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