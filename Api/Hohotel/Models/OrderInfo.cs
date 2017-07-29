using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Models.DataModels;

namespace Hohotel.Models
{
    public class OrderInfo
    {
        public string UserId { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string UserName { get; set; }
        public string Surname { get; set; }
        public bool TakeAway { get; set; }
        public IList<DishPortionOrder> Portions { get; set; }
    }
}
