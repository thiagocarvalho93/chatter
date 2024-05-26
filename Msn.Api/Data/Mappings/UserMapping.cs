using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Msn.Api.Models;

namespace Msn.Api.Data.Mappings;
public class UserMapping : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(u => u.Email)
            .HasColumnName("email")
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(u => u.HashedPassword)
            .HasColumnName("hashed_password")
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(u => u.Nickname)
            .HasColumnName("nickname")
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(u => u.Subnick)
            .HasColumnName("subnick")
            .HasMaxLength(100);

        builder.Property(u => u.ImageUrl)
            .HasColumnName("image_url")
            .HasMaxLength(255);

        builder.Property(u => u.LastOnline)
            .HasColumnName("last_online")
            .HasColumnType("TEXT");
    }
}