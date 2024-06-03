using Microsoft.AspNetCore.Mvc;
using Msn.Api.Repositories;

namespace Msn.Api.Endpoints
{
    public static class Messages
    {
        public static void RegisterMessageEndpoints(this IEndpointRouteBuilder routes)
        {
            var messages = routes.MapGroup("api/v1/messages");

            messages.MapGet("", async ([FromServices] MessageRepository repository) => await repository.GetAllMessages());
        }
    }
}