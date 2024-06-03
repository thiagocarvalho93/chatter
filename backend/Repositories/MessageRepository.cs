using Microsoft.EntityFrameworkCore;
using Msn.Api.Data;
using Msn.Api.Models;

namespace Msn.Api.Repositories
{
    public class MessageRepository(DataContext db)
    {
        private readonly DataContext _db = db;

        public async Task AddMessage(string text, string user)
        {
            var message = new Message(text, user);

            await _db.Messages.AddAsync(message);

            _db.SaveChanges();
        }

        public async Task<IEnumerable<Message>> GetAllMessages() => await _db.Messages.ToListAsync();
    }
}