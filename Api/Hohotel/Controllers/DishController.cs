using System;
using System.Collections.Generic;
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
        public Dish Post([FromBody]Dish dish)
        {
            dish.CreatedBy = User.Identity.Name;
            dish.ModifiedBy = User.Identity.Name;
            dish.CreatedTime = DateTime.Now;
            dish.ModifiedTime = DateTime.Now;

            return _service.AddDish(dish);
        }

        // PUT api/dish
        [Authorize]
        [HttpPut]
        public Dish Put([FromBody]Dish dish)
        {
            dish.ModifiedBy = User.Identity.Name;
            dish.ModifiedTime = DateTime.Now;
            return _service.EditDish(dish);
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
