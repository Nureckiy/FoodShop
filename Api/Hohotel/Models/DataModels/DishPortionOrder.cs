using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
