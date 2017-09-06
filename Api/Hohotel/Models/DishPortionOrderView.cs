namespace Hohotel.Models
{
    public class DishPortionOrderView
    {
        public int Id { get; set; }
        public string ParentName { get; set; }
        public string Size { get; set; }
        public string Weight { get; set; }
        public decimal Price { get; set; }
        public int Count { get; set; }
    }
}
