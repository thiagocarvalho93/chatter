namespace Msn.Api.Models
{
    public class Message(string text, string user)
    {
        public int Id { get; set; }
        public string Text { get; set; } = text;
        public string User { get; set; } = user;
        public DateTime DateTime { get; set; } = DateTime.Now;
    }
}