using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Hohotel.Enums;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Microsoft.Extensions.Options;

namespace Hohotel.Services
{
    public class OrderService: IOrderService 
    {
        private readonly HohotelContext _context;
        private readonly IMapper _mapper;
        private readonly AppConfiguration _configuration;

        public OrderService(HohotelContext context, IMapper mapper, IOptions<AppConfiguration> configuration)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration.Value;
        }

        public IList<OrderView> GetUserOrders(string userId)
        {
            return _context.Orders
                .Where(order => order.UserId == userId)
                .ProjectTo<OrderView>(_mapper)
                .OrderByDescending(order => order.StatusUpdatedDate)
                .ToList();
        }

        public PaginationModel<OrderView> GetOrders(int? pageNumber, int? itemsCount)
        {
            var takePage = pageNumber ?? 1;
            var takeCount = itemsCount ?? _configuration.DefaultPageRecordCount;
            var orders = _context.Orders
                .ProjectTo<OrderView>(_mapper)
                .OrderByDescending(order => order.StatusUpdatedDate)
                .Skip((takePage - 1) * takeCount)
                .Take(takeCount)
                .ToList();
            var allOrdersCount = _context.Orders.Count();
            return new PaginationModel<OrderView>
            {
                Items = orders,
                TotalItems = allOrdersCount
            };

        }

        public OrderView ChangeStatus(UpdateStatusModel updateModel)
        {
            var order = _context.Orders.Find(updateModel.Id);
            if (order.Status == OrderStatus.Closed)
            {
                throw new ArgumentException("Can't change status from closed");
            }

            _mapper.Map(updateModel, order);
            _context.Orders.Update(order);
            _context.SaveChanges();
            return _context.Orders
                .ProjectTo<OrderView>(_mapper)
                .Single(o => o.Id == order.Id);
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
