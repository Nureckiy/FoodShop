using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Models.DataModels;
using Hohotel.Services;
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
        [HttpGet("popular/{count}")]
        public IList<Dish> Popular(int count)
        {
            return _service.GetPopular(count);
        }

        // GET api/dish/pizza
        [HttpGet("{category}")]
        public IList<Dish> Get(string category)
        {
            return _service.GetByCategoryName(category);
        }
    }
}
