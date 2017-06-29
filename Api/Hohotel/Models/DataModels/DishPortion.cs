namespace Hohotel.Models.DataModels
{
    public class DishPortion
    {
        public int Id { get; set; }
        public Dish Parent { get; set; }
        public string Size { get; set; }
        public double? Weight { get; set; }
        public decimal Price { get; set; }
    }
}
