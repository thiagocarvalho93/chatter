using Msn.Api.Endpoints;
using Msn.Api.Extensions;
using Msn.Api.Hubs;

var builder = WebApplication.CreateBuilder(args);
builder.RegisterServices();

var app = builder.Build();

app.RegisterMiddlewares();

app.RegisterUserEndpoints();
app.RegisterMessageEndpoints();
app.MapHub<ChatHub>("/chat");

app.Run();
