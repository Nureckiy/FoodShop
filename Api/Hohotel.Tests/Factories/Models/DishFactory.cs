using System.Collections.Generic;
using System.Linq;
using Hohotel.Enums;
using Hohotel.Models.DataModels;

namespace Hohotel.Tests.Factories.Models
{
    public static class DishFactory
    {
        public static Dish Dish(this ITestDataFactory factory,
            int id = 0,
            string name = null,
            string imageUrl = null,
            string description = null,
            IList<DishPortion> dishPortions = null,
            DishTypes category = DishTypes.Hot)
        {
            var model = new Dish()
            {
                Id = id,
                Name = name,
                ImageUrl = imageUrl,
                Description = description,
                DishPortions = dishPortions,
                Category = category
            };
            return model;
        }

        public static IList<Dish> Dishes(this ITestDataFactory factory, int count)
        {
            return Enumerable.Range(0, count).Select(index => factory.Dish(index)).ToList();
        }
    }
}
