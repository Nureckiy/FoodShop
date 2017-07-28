﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Enums;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Expressions;

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

        public void AddDish(Dish dish, string userId)
        {
            dish.CreatedBy = userId;
            dish.ModifiedBy = userId;
            dish.CreatedTime = DateTime.Now;
            dish.ModifiedTime = DateTime.Now;

            _context.Dishes.Add(dish);
            _context.SaveChanges();
        }

        public void EditDish(Dish dish, string userId)
        {
            dish.ModifiedBy = userId;
            dish.ModifiedTime = DateTime.Now;
            _context.Dishes.Update(dish);
            _context.SaveChanges();
        }
    }
}
