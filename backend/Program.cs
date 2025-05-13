using Microsoft.EntityFrameworkCore;
using Msn.Api.Data;
using Msn.Api.Endpoints;
using Msn.Api.Extensions;
using Msn.Api.Hubs;

var builder = WebApplication.CreateBuilder(args);
builder.RegisterServices();

var app = builder.Build();

await RunMigration(app);

app.RegisterMiddlewares();

app.RegisterUserEndpoints();
app.RegisterMessageEndpoints();
app.MapHub<ChatHub>("/chat");

app.Run();

static async Task RunMigration(WebApplication app)
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<DataContext>();
    await db.Database.MigrateAsync();
}