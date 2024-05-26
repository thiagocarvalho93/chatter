using Microsoft.EntityFrameworkCore;
using Msn.Api.Data.Mappings;
using Msn.Api.Models;

namespace Msn.Api.Data
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public string DbPath { get; }

        public DataContext()
        {
            DbPath = "userdata.db";
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UserMapping());
            modelBuilder.ApplyConfiguration(new MessageMapping());
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");
    }
}