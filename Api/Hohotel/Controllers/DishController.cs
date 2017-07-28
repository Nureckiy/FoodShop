using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Models.DataModels;
using Hohotel.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hohotel.Controllers
{
    [Route("api/[controller]")]
    public class DishController : Controller
    {
        private readonly IDishService _service;

        public DishController(IDishService service)
        {
            _service = service;
        }

        // GET: api/dish/getPopular/5
        [Authorize]
        [HttpGet("popular/{count}")]
        public IList<Dish> Popular(int count)
        {
            return _service.GetPopular(count);
        }

        // GET api/dish/pizza
        [Authorize]
        [HttpGet("{category}")]
        public IList<Dish> Get(string category)
        {
            return _service.GetByCategoryName(category);
        }

        // POST api/dish
        [Authorize]
        [HttpPost]
        public void Post([FromBody]Dish dish)
        {
            _service.AddDish(dish, User.Identity.Name);
        }

        // PUT api/dish
        [Authorize]
        [HttpPut]
        public void Put([FromBody]Dish dish)
        {
            _service.EditDish(dish, User.Identity.Name);
        }

        // DELETE api/dish/1
        [Authorize]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _service.DeleteDish(id);
        }
    }
}
