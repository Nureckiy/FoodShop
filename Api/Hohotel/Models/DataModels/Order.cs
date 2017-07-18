using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Hohotel.Enums;

namespace Hohotel.Models.DataModels
{
    public class Order
    {
        private DateTime? _checkoutDate;

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Surname { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public bool TakeAway { get; set; }
        public decimal Total { get; set; }
        public virtual IList<DishPortionOrder> DishPortionOrders { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime CheckoutDate {
            get => _checkoutDate ?? DateTime.Now;
            set => _checkoutDate = value;
        }
        public DateTime? CompletionDate { get; set; }
    }
}
