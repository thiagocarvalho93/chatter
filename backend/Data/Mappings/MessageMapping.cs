using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Msn.Api.Models;

namespace Msn.Api.Data.Mappings
{
    public class MessageMapping : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder.ToTable("Messages");

            builder.HasKey(m => m.Id);

            builder.Property(m => m.Id)
                .HasColumnName("id")
                .HasColumnType("INTEGER")
                .ValueGeneratedOnAdd();

            builder.Property(m => m.Text)
                .HasColumnName("text")
                .IsRequired()
                .HasMaxLength(1000)
                .HasColumnType("TEXT");

            builder.Property(m => m.User)
                .HasColumnName("user")
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnType("TEXT");

            builder.Property(m => m.DateTime)
                .HasColumnName("date_time")
                .HasColumnType("TEXT")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
        }
    }
}