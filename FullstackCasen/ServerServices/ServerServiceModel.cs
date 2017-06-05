using FullstackCasen.Repositories;
using FullstackCasen.Server;

namespace FullstackCasen.ServerServices
{
    public class ServerServiceModel : IEntity
    {
        public int Id { get; set; }
        public ServerModel Server{ get; set; }
        public ServiceModel Service { get; set; }
    }
}
