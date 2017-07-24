using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Hohotel.Enums;
using Hohotel.Models;
using Hohotel.Models.DataModels;

namespace Hohotel.Tests.Factories.Models
{
    public static class OrderInfoFactory
    {
        public static OrderInfo OrderInfo(this ITestDataFactory factory,
            string address = null,
            string email = null,
            string phone = null,
            string userName = null,
            string surname = null,
            IList<DishPortionOrder> portions = null)
        {
            var model = new OrderInfo()
            {
                Address = address,
                Email = email,
                Phone = phone,
                UserName = userName,
                Surname = surname,
                Portions = portions
            };
            return model;
        }

        public static IList<OrderInfo> OrderInfos(this ITestDataFactory factory, int count)
        {
            return Enumerable.Range(0, count).Select(index => factory.OrderInfo()).ToList();
        }
    }
}
