using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FullstackCasen.Repositories;
using FullstackCasen.Server;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FullstackCasen.ServerServices
{
    [Route("api/serverservice")]
    public class ServerServiceController : Controller
    {
        private readonly Repository _repo;
        public ServerServiceController(Repository repo)
        {
            _repo = repo;
        }

        [HttpPost("create")]
        public ActionResult Create(int serverId, int serviceId)
        {
            var server = _repo.Servers.SingleOrDefault(x => x.Id == serverId);
            var service = _repo.Services.SingleOrDefault(x => x.Id == serviceId);

            var serverService = new ServerServiceModel(){Server = server, Service = service};
            _repo.ServerServices.Add(serverService);
            _repo.SaveChanges();

            return Ok();
        }
        
        [HttpGet("server")]
        public ActionResult GetAllServerServicesForServer(int serverId)
        {

            var server = _repo.Servers.SingleOrDefault(x => x.Id == serverId);

            if (server == null)
            {
                return NotFound();
            }

            var services = _repo.ServerServices.Where(x => x.Server.Id == serverId)
                .Include(x => x.Service)
                .Select(x => x.Service);

            var serviceList = new {server, services};

            return Ok(serviceList);
        }

        [HttpGet("servicelist")]
        public ActionResult ListAllServerServices()
        {
            var serverServices = _repo.ServerServices
                .Include(x => x.Server)
                .Include(x => x.Service)
                .GroupBy(x => x.Server, y => y.Service);

            return Ok(serverServices);
        }

    }

    public class ServerServiceViewModel
    {
        public ServerModel Server { get; set; }
        public ServiceModel Service{ get; set; }
    }
}