using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Enums;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Expressions;
using Remotion.Linq.Parsing.Structure.IntermediateModel;

namespace Hohotel.Services
{
    public class DishService: IDishService
    {
        private readonly HohotelContext _context;

        public DishService(HohotelContext context)
        {
            _context = context;
        }

        public IList<Dish> GetPopular(int count)
        {
            var result = _context.Dishes
                .Include("DishPortions")
                .OrderByDescending(dish => dish.DishPortions
                    .SelectMany(portion => portion.DishPortionOrders)
                    .Count())
                .Take(count)
                .ToList();
            return result;
        }

        public IList<Dish> GetByCategoryName(string categoryName)
        {
            return _context.Dishes
                .Include("DishPortions")
                .Where(dish => categoryName.Equals(dish.Category.ToString(), StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        public Dish AddDish(Dish dish)
        {
            _context.Dishes.Add(dish);
            _context.SaveChanges();
            return dish;
        }

        public Dish EditDish(Dish dish)
        {
            _context.DishPortions.RemoveRange(_context.DishPortions
                .Where(portion => portion.Parent.Id == dish.Id && 
                dish.DishPortions.All(dp => dp.Id != portion.Id))
            );
            _context.Dishes.Update(dish);
            _context.SaveChanges();

            return dish;
        }

        public void DeleteDish(int id)
        {
            var dish = _context.Dishes
                .Include(d => d.DishPortions)
                .Single(d => d.Id == id);
            _context.Dishes.Remove(dish);
            _context.SaveChanges();
        }
    }
}
