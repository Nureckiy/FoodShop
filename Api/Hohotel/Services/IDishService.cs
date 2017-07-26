using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Models.DataModels;

namespace Hohotel.Services
{
    public interface IDishService
    {
        IList<Dish> GetPopular(int count);

        IList<Dish> GetByCategoryName(string categoryName);

        void AddDish(Dish dish, string userId);
    }
}
