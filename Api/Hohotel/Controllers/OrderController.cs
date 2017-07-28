using System.Collections.Generic;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Hohotel.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hohotel.Controllers
{
    [Route("api/[controller]")]
    public class OrderController: Controller
    {
        private readonly IOrderService _service;

        public OrderController(IOrderService service)
        {
            _service = service;
        }

        // POST api/order
        [HttpPost]
        public Order Post([FromBody]OrderInfo order)
        {
            order.UserId = User.Identity.Name;
            return _service.PlaceOrder(order);
        }

        // GET api/order
        [HttpGet]
        public IList<OrderView> Get()
        {
            return _service.GetUserOrders(User.Identity.Name);
        }
    }
}
