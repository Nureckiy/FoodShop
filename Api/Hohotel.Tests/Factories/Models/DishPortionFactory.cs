using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Hohotel.Models.DataModels;

namespace Hohotel.Tests.Factories.Models
{
    public static class DishPortionFactory
    {
        public static DishPortion DishPortion(this ITestDataFactory factory,
            int id = 0,
            Dish parent = null,
            string size = null,
            string weight = null,
            decimal price = 0,
            IList<DishPortionOrder> dishPortionOrders = null)
        {
            var model = new DishPortion()
            {
                Id = id,
                Parent = parent,
                Size = size,
                Weight = weight,
                Price = price,
                DishPortionOrders = dishPortionOrders ?? new List<DishPortionOrder>()
            };
            return model;
        }

        public static IList<DishPortion> DishPortions(this ITestDataFactory factory, int count, IList<DishPortionOrder> dishPortionOrders = null)
        {
            return Enumerable.Range(0, count).Select(index => factory.DishPortion(index, dishPortionOrders: dishPortionOrders)).ToList();
        }
    }
}
