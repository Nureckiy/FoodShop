using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Models.DataModels;

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

        public FullRoomCategory(RoomCategory category)
        {
            Id = category.Id;
            Name = category.Name;
            Description = category.Description;
            CoverUrl = category.CoverUrl;
            GuestsNumber = category.GuestsNumber;
        }
    }
}
