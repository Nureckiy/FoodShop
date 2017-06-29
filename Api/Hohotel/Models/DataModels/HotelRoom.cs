namespace Hohotel.Models.DataModels
{
    public class HotelRoom
    {
        public int Id { get; set; }
        public HotelRoomCategory Category { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
    }
}
