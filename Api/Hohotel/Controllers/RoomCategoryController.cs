using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Hohotel.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hohotel.Controllers
{
    [Route("api/[controller]")]
    public class RoomCategoryController : Controller
    {
        private readonly IRoomCategoryService _service;

        public RoomCategoryController(IRoomCategoryService service)
        {
            _service = service;
        }

        // GET: api/roomCategory
        [HttpGet]
        public IEnumerable<PreviewCategory> Get()
        {
            return _service.GetRoomCategories();
        }

        // GET api/roomCategory/5
        [HttpGet("{id}")]
        public FullRoomCategory Get(int id)
        {
            return _service.GetRoomCategoryById(id); ;
        }

        // GET: api/roomCategory/inStock
        [HttpGet("inStock")]
        public IEnumerable<ItemInfo> InStock()
        {
            return _service.GetCategoriesInfo();
        }

        // POST api/roomCategory
        [Authorize]
        [HttpPost]
        public void Post([FromBody]RoomCategory category)
        {
            _service.AddRoomCategory(category, User.Identity.Name);
        }

        // PUT api/roomCategory
        [Authorize]
        [HttpPut]
        public void Put([FromBody]RoomCategory category)
        {
            _service.EditRoomCategory(category, User.Identity.Name);
        }
    }
}
