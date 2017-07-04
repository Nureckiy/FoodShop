using System.ComponentModel.DataAnnotations.Schema;

namespace Hohotel.Models.DataModels
{
    public class DishPortion
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Dish Parent { get; set; }
        public string Size { get; set; }
        public double? Weight { get; set; }
        public decimal Price { get; set; }
    }
}
