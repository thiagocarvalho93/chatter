namespace Msn.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = "";
        public string HashedPassword { get; set; } = "";
        public string Nickname { get; set; } = "";
        public string Subnick { get; set; } = "";
        public string ImageUrl { get; set; } = "";
        public DateTime LastOnline { get; set; }
    }
}