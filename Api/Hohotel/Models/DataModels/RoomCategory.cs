using System.ComponentModel.DataAnnotations.Schema;

namespace Hohotel.Models.DataModels
{
    public class RoomCategory
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public int GuestsNumber { get; set; }
        public string Description { get; set; }
        public string CoverUrl { get; set; }
    }
}
