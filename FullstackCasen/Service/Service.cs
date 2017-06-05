using FullstackCasen.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FullstackCasen.Server
{
    public class ServiceModel : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
