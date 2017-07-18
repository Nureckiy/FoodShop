using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Hohotel.Models.DataModels;

namespace Hohotel.Tests.Factories.Models
{
    public static class DishPortionOrderFactory
    {
        public static DishPortionOrder DishPortionOrder(this ITestDataFactory factory,
            int dishPortionId = 0,
            DishPortion dishPortion = null,
            int orderId = 0,
            Order order = null)
        {
            var model = new DishPortionOrder()
            {
                DishPortionId = dishPortionId,
                DishPortion = dishPortion,
                OrderId = orderId,
                Order = order
            };
            return model;
        }

        public static IList<DishPortionOrder> DishPortionOrders(this ITestDataFactory factory, int count)
        {
            return Enumerable.Range(0, count).Select(index => DishPortionOrder(factory, index)).ToList();
        }
    }
}
