using FullstackCasen.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace FullstackCasen.Server
{
    [Route("api/server")]
    public class ServerController : Controller 
    {
        private readonly Repository _repo;
        public ServerController(Repository repo)
        {
            _repo = repo;
        }

        [HttpGet("list")]
        public ActionResult List()
        {
            var servers = _repo.Servers.Take(10).ToList();

            return Ok(servers);
        }

        [HttpPost("create")]
        public ActionResult Create(ServerModel server)
        {
            ServerModel newServer = new ServerModel(){Name = server.Name};
            _repo.Servers.Add(newServer);
            _repo.SaveChanges();

            return Ok();
        }

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var server = _repo.Servers.SingleOrDefault(x => x.Id == id);
            if (server == null)
                return NotFound();
                
            return Ok(server);
        }

        [HttpDelete("delete")]
        public ActionResult Delete(ServerModel server)
        {
            _repo.Servers.Remove(server);
            _repo.SaveChanges();

            return Ok();
        }

        [HttpPut("update")]
        public ActionResult Update(ServerModel server)
        {
            var updateserver = _repo.Servers.SingleOrDefault(x => x.Id == server.Id);
            updateserver.Name = server.Name;

            _repo.SaveChanges();
            
            return Ok();
        }
    }
}