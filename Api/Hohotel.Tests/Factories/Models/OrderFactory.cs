using System;
using System.Collections.Generic;
using System.Linq;
using Hohotel.Enums;
using Hohotel.Models.DataModels;

namespace Hohotel.Tests.Factories.Models
{
    public static class OrderFactory
    {
        public static Order Order(this ITestDataFactory factory,
            int id = 0,
            DateTime? checkoutDate = null,
            DateTime? completionDate = null,
            string userId = null,
            string userName = null,
            string phone = null,
            string address = null,
            bool takeAway = false,
            decimal total = 0,
            IList<DishPortionOrder> dishPortionOrders = null,
            OrderStatus status = OrderStatus.NotStarted)
        {
            var model = new Order()
            {
                Id = id,
                UserId = userId,
                UserName = userName,
                Phone = phone,
                Address = address,
                TakeAway = takeAway,
                Total = total,
                DishPortionOrders = dishPortionOrders ?? new List<DishPortionOrder>(),
                Status = status
            };
            if (checkoutDate != null)
            {
                model.CheckoutDate = checkoutDate.Value;
            }
            if (completionDate != null)
            {
                model.CompletionDate = completionDate.Value;
            }
            return model;
        }

        public static IList<Order> Orders(this ITestDataFactory factory, int count)
        {
            return Enumerable.Range(0, count).Select(index => factory.Order(index)).ToList();
        }
    }
}
