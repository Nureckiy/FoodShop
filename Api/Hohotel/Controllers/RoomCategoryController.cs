using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Hohotel.Services;
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

        // GET: api/values
        [HttpGet]
        public IEnumerable<PreviewCategory> Get()
        {
            return _service.GetRoomCategories();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public FullRoomCategory Get(int id)
        {
            return _service.GetRoomCategoryById(id); ;
        }
    }
}
