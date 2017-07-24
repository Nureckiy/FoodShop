using System;
using System.Collections.Generic;
using Hohotel.Enums;
using Hohotel.Models.DataModels;

namespace Hohotel.Models
{
    public class OrderView: Order
    {
        public IList<DishPortionOrderView> Portions { get; set; }
    }
}
