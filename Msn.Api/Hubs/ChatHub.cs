using Microsoft.AspNetCore.SignalR;
using Msn.Api.Repositories;

namespace Msn.Api.Hubs
{
    public class ChatHub(MessageRepository messageRepository) : Hub
    {
        private readonly MessageRepository _messageRepository = messageRepository;

        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("Connect", $"New user has connected.", DateTime.Now);

            await base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            Clients.All.SendAsync("Disconnect", $"User has disconnected.");
            return base.OnDisconnectedAsync(exception);
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