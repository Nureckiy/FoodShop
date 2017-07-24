using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Hohotel.Models;

namespace Hohotel.Tests.Factories.Models
{
    public static class RoomFilterFactory
    {
        public static RoomFilter RoomFilter(this ITestDataFactory factory,
            int categoryId = 0,
            DateTime? arrivalDate = null,
            DateTime? departureDate = null
            )
        {
            return new RoomFilter()
            {
                CategoryId = categoryId,
                StartDate = arrivalDate,
                EndDate = departureDate
            };
        }

        public static IList<RoomFilter> RoomFilters(this ITestDataFactory factory, int count)
        {
            return Enumerable.Range(0, count).Select(e => factory.RoomFilter()).ToList();
        }
    }
}
