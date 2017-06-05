using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FullstackCasen.Server;
using FullstackCasen.ServerServices;

namespace FullstackCasen.Repositories
{
    public class Repository : DbContext
    {

        public Repository(DbContextOptions<Repository> options) : base(options)
        {
        }
        public DbSet<ServerModel> Servers { get; set; }
        public DbSet<ServiceModel> Services { get; set; }
        public DbSet<ServerServiceModel> ServerServices { get; set; }
    }
}
