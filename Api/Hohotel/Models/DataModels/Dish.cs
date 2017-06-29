using System.Collections.Generic;
using Hohotel.Enums;

namespace Hohotel.Models.DataModels
{
    public class Dish
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public virtual IEnumerable<DishPortion> DishPortions { get; set; }
        public DishTypes Category { get; set; }
    }
}
