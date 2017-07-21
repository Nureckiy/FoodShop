using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Hohotel.Enums;
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
            var order = _mapper.Map<OrderInfo, Order>(orderInfo);
            LoadOrders(order.DishPortionOrders);
            order.Total = CountTotal(order.DishPortionOrders);
            order.UserId = userId;
            order.Status = OrderStatus.Opened;
            _context.Orders.Add(order);
            _context.SaveChanges();
            return order;
        }

        private void LoadOrders(IList<DishPortionOrder> orders)
        {
            orders.ToList().ForEach(order => order.DishPortion = _context.DishPortions
                .Single(dishPortion => dishPortion.Id == order.DishPortionId));
        }

        public decimal CountTotal(IList<DishPortionOrder> portionOrders)
        {
            return portionOrders.Sum(order => CountTotal(order));
        }

        public decimal CountTotal(DishPortionOrder portionOrder)
        {
            return portionOrder.Count * portionOrder.DishPortion.Price;
        }
    }
}
