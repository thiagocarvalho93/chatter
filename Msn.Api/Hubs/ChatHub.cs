using Microsoft.AspNetCore.SignalR;
using Msn.Api.Repositories;
using Msn.Api.Services;

namespace Msn.Api.Hubs
{
    public class ChatHub(MessageRepository messageRepository, ConnectionManager connectionManager) : Hub
    {
        private readonly MessageRepository _messageRepository = messageRepository;
        private readonly ConnectionManager _connectionManager = connectionManager;

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var cookies = httpContext?.Request.Cookies;

            if (cookies.TryGetValue("username", out var username))
            {
                var connectionId = Context.ConnectionId;

                _connectionManager.AddConnection(connectionId, username);
            }

            await Clients.All.SendAsync("Connect", $"user {username} has connected.", DateTime.Now, _connectionManager.GetAllUserNames());
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var connectionId = Context.ConnectionId;
            var name = _connectionManager.GetUserName(connectionId);

            _connectionManager.RemoveConnection(connectionId);

            await Clients.All.SendAsync("Disconnect", $"User {name} has disconnected.", DateTime.Now, _connectionManager.GetAllUserNames());
            await base.OnDisconnectedAsync(exception);
        }

        public async Task Broadcast(string name, string message)
        {
            try
            {
                await Clients.All.SendAsync("ReceiveMessage", name, message, DateTime.Now);

                await _messageRepository.AddMessage(message, name);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
    }
}