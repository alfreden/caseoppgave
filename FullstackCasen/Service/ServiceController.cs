using FullstackCasen.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FullstackCasen.Server
{
    [Route("api/service")]
    public class ServiceController : Controller
    {
        private readonly Repository _repo;
        public ServiceController(Repository repo)
        {
            _repo = repo;
        }

        [HttpGet("list")]
        public ActionResult List()
        {
            var services = _repo.Services.Take(10).ToList();

            return Ok(services);
        }

        [HttpPost("create")]
        public ActionResult Create(ServiceModel service)
        {
            _repo.Services.Add(service);
            _repo.SaveChanges();

            return Ok();
        }

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var service = _repo.Services.SingleOrDefault(x => x.Id == id);
            if (service == null)
                return NotFound();

            return Ok(service);
        }

        [HttpDelete("delete")]
        public ActionResult Delete(ServiceModel service)
        {
            _repo.Services.Remove(service);
            _repo.SaveChanges();

            return Ok();
        }

        [HttpPut("update")]
        public ActionResult Update(ServiceModel service)
        {
            var updateservice = _repo.Services.SingleOrDefault(x => x.Id == service.Id);
            updateservice.Name = service.Name;

            _repo.SaveChanges();

            return Ok();
        }
    }
}