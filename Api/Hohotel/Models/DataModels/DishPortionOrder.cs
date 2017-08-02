namespace Hohotel.Models.DataModels
{
    public class DishPortionOrder
    {
        public int DishPortionId { get; set; }
        public DishPortion DishPortion { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }

        public int Count { get; set; }
    }
}
