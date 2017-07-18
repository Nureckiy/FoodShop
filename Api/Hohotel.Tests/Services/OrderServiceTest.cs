using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Hohotel.Services;
using Hohotel.Services.Mapping;
using Moq;
using Xunit;

namespace Hohotel.Tests.Services
{
    public class OrderServiceTest
    {
        private readonly Mock<HohotelContext> _context;
        private readonly Mock<IMapper> _mapper;
        private readonly OrderService _service;

        public OrderServiceTest()
        {
            _context = new Mock<HohotelContext>();
            _mapper = new Mock<IMapper>();
            _service = new OrderService(_context.Object, _mapper.Object);
        }

        [Fact]
        public void PlaceOrder_FilledObject_ShouldSaveToDatabase()
        {
        }

        [Fact]
        public void PlaceOrder_NullableObject_ThrowError()
        {

        }
    }
}
