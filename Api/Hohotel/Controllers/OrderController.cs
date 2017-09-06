using System;
using System.Collections.Generic;
using Hohotel.Enums;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Hohotel.Services;
using Microsoft.AspNetCore.Authorization;
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
            order.StatusUpdatedDate = DateTime.Now;
            return _service.PlaceOrder(order);
        }

        // GET api/order
        [HttpGet]
        public IList<OrderView> Get()
        {
            return _service.GetUserOrders(User.Identity.Name);
        }

        //GET api/order/all
        [Authorize(Roles = "kitchen-manager")]
        [HttpGet("sort")]
        public PaginationModel<OrderView> Sort(int? pageNumber, int? itemsCount)
        {
            return _service.GetOrders(pageNumber, itemsCount);
        }

        //PUT api/order/status
        [Authorize("change:orderStatus")]
        [HttpPut("Status")]
        public OrderView ChangeStatus([FromBody]UpdateStatusModel updateModel)
        {
            if (updateModel.Status == OrderStatus.Closed)
            {
                updateModel.CompletionDate = DateTime.Now;
            }
            else
            {
                updateModel.CompletionDate = null;
            }
            updateModel.StatusUpdatedBy = User.Identity.Name;
            updateModel.StatusUpdatedDate = DateTime.Now;
            return _service.ChangeStatus(updateModel);
        }
    }
}
