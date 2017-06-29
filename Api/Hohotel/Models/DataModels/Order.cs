using System;
using System.Collections.Generic;
using Hohotel.Enums;

namespace Hohotel.Models.DataModels
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime CheckoutDate { get; set; }
        public DateTime CompletionDate { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public bool TakeAway { get; set; }
        public decimal Total { get; set; }
        public virtual IEnumerable<DishPortion> Dishes { get; set; }
        public OrderStatus Status { get; set; }
    }
}
