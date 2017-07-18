using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Hohotel.Enums;

namespace Hohotel.Models.DataModels
{
    public class Dish
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public virtual IList<DishPortion> DishPortions { get; set; }
        public DishTypes Category { get; set; }
    }
}
