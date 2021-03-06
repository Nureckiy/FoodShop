﻿using System.Collections.Generic;
using Hohotel.Models;
using Hohotel.Models.DataModels;

namespace Hohotel.Services
{
    public interface IOrderService
    {
        Order PlaceOrder(OrderInfo order);

        IList<OrderView> GetUserOrders(string userId);

        PaginationModel<OrderView> GetOrders(int? pageNumber, int? itemsCount);

        OrderView ChangeStatus(UpdateStatusModel updateModel);
    }
}
