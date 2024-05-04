using System.Collections.Concurrent;

namespace Msn.Api.Services
{
    public class ConnectionManager
    {
        public ConcurrentDictionary<string, string> Connections { get; set; } = new();

        public void AddConnection(string connectionId, string userName)
        {
            Connections.TryAdd(connectionId, userName);
        }

        public void RemoveConnection(string connectionId)
        {
            Connections.TryRemove(connectionId, out _);
        }

        public string? GetUserName(string connectionId)
        {
            Connections.TryGetValue(connectionId, out string? userName);
            return userName;
        }

        public List<string> GetAllUserNames()
        {
            return [.. Connections.Values];
        }
    }
}