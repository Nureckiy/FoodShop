using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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

        public IList<OrderView> GetUserOrders(string userId)
        {
            return _context.Orders
                .Where(order => order.UserId == userId)
                .ProjectTo<OrderView>(_mapper)
                .ToList();
        }

        public Order PlaceOrder(OrderInfo orderInfo)
        {
            var order = _mapper.Map<OrderInfo, Order>(orderInfo);
            LoadOrders(order.DishPortionOrders);
            order.Total = CountTotal(order.DishPortionOrders);
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
