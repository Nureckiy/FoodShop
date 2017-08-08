using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Enums;

namespace Hohotel.Models
{
    public class UpdateStatusModel
    {
        public int Id { get; set; }
        public OrderStatus Status { get; set; }
        public string StatusUpdatedBy { get; set; }
        public DateTime? StatusUpdatedDate { get; set; }
    }
}
