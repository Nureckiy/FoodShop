using System;
using System.Collections.Generic;
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
            return _service.GetRoomCategoryById(id);
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
        public RoomCategory Post([FromBody]RoomCategory category)
        {
            category.CreatedBy = User.Identity.Name;
            category.ModifiedBy = User.Identity.Name;
            category.CreatedTime = DateTime.Now;
            category.ModifiedTime = DateTime.Now;
            return _service.AddRoomCategory(category);
        }

        // PUT api/roomCategory
        [Authorize]
        [HttpPut]
        public RoomCategory Put([FromBody]RoomCategory category)
        {
            category.ModifiedBy = User.Identity.Name;
            category.ModifiedTime = DateTime.Now;
            return _service.EditRoomCategory(category);
        }

        // DELETE api/roomCategory/1
        [Authorize]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _service.DeleteRoomCategory(id);
        }
    }
}
