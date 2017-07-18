using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using Hohotel.Enums;

namespace Hohotel.Models.DataModels
{
    public class Booking
    {
        private DateTime? _registrationTime;

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public decimal Total { get; set; }
        public string UserId { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }
        public string Phone { get; set; }
        public virtual IList<RoomBooking> RoomBookings { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime RegistrationTime {
            get => _registrationTime ?? DateTime.Now;
            set => _registrationTime = value;
        }
    }
}
