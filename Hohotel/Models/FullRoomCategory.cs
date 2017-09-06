using System.Collections.Generic;

namespace Hohotel.Models
{
    public class FullRoomCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CoverUrl { get; set; }
        public int GuestsNumber { get; set; }
        public decimal? MinPrice { get; set; }
        public IEnumerable<string> Images { get; set; }
    }
}
