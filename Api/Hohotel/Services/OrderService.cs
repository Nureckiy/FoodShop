using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Hohotel.Models;
using Hohotel.Models.DataModels;

namespace Hohotel.Services
{
    public class OrderService: IOrderService
    {
        private readonly HohotelContext _context;
        private readonly IMapper _mapper;

        public OrderService(HohotelContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Order PlaceOrder(OrderInfo orderInfo, string userId)
        {
            return null;
        }
    }
}
