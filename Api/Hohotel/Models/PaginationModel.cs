using System.Collections.Generic;

namespace Hohotel.Models
{
    public class PaginationModel<T>
    {
        public int TotalItems { get; set; }

        public List<T> Items { get; set; }
    }
}
