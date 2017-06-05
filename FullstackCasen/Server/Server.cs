using FullstackCasen.Repositories;

namespace FullstackCasen.Server
{
    public class ServerModel : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
