using System.Collections.Generic;
using System.Linq;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Hohotel.Services;
using Hohotel.Services.Mapping;
using Hohotel.Tests.Factories;
using Hohotel.Tests.Factories.Models;
using Hohotel.Tests.Helper;
using Hohotel.Tests.Mapper;
using Moq;
using Xunit;

namespace Hohotel.Tests.Services
{
    public class RoomCategoryServiceTest
    {
        private readonly Mock<HohotelContext> _context;
        private readonly RoomCategoryService _service;

        public RoomCategoryServiceTest()
        {
            _context = new Mock<HohotelContext>();
            AutoMapper.Mapper.Initialize(a => a.AddProfile<MappingProfile>());
            var mapper = AutomapperConfig.Initialize();
            _service = new RoomCategoryService(_context.Object, mapper);
        }

        [Fact]
        public void GetRoomCategories()
        {
            var categories = TestData.Create.RoomCategories(3);
            var rooms = TestData.Create.Rooms(2, categories[0]);
            rooms[0].Price = 30.52m;
            rooms[1].Price = 12.41m;

            _context.Setup(c => c.Rooms).Returns(DbSetMock.Create(rooms.ToArray()).Object);
            _context.Setup(c => c.RoomCategories).Returns(DbSetMock.Create(categories.ToArray()).Object);

            var result = _service.GetRoomCategories();
            Assert.Equal(3, result.Count);
            Assert.True(result.Any(c => c.Id == 0 && c.MinPrice == 12.41m));
        }

        [Fact]
        public void GetRoomCategoryById_MatchedId_ReturnElement()
        {
            var categories = TestData.Create.RoomCategories(3);
            var rooms = new List<Room>();
            rooms.Add(TestData.Create.Room(category: categories[1], imageUrl: "first img", price: 15.15m));
            rooms.Add(TestData.Create.Room(category: categories[1], imageUrl: "second img", price: 0.15m));

            _context.Setup(c => c.Rooms).Returns(DbSetMock.Create(rooms.ToArray()).Object);
            _context.Setup(c => c.RoomCategories).Returns(DbSetMock.Create(categories.ToArray()).Object);

            var result = _service.GetRoomCategoryById(categories[1].Id);
            Assert.Equal(categories[1].Id, result.Id);
            Assert.Equal(0.15m, result.MinPrice);
            Assert.Equal(new [] {"first img", "second img"}, result.Images);
        }

        [Fact]
        public void GetRoomCategoryById_UnMatchedId_ReturnNull()
        {
            var categories = TestData.Create.RoomCategories(3);

            _context.Setup(c => c.RoomCategories).Returns(DbSetMock.Create(categories.ToArray()).Object);

            Assert.Null(_service.GetRoomCategoryById(10));
        }

        [Fact]
        public void AddRoomCategory()
        {
            var category = TestData.Create.RoomCategory();
            var categoryMock = DbSetMock.Create(new RoomCategory[0]);

            _context.Setup(c => c.RoomCategories).Returns(categoryMock.Object);

            var result =_service.AddRoomCategory(category);

            categoryMock.Verify(m => m.Add(It.IsAny<RoomCategory>()), Times.Once);
            _context.Verify(c => c.SaveChanges(), Times.Once);
            Assert.Equal(category, result);
        }

        [Fact]
        public void EditRoomCategory()
        {
            var category = TestData.Create.RoomCategory(3);
            var categoryMock = DbSetMock.Create(category);

            _context.Setup(c => c.RoomCategories).Returns(categoryMock.Object);

            var editedCategory = TestData.Create.RoomCategory(3);

            var result = _service.EditRoomCategory(editedCategory);

            categoryMock.Verify(m => m.Update(It.IsAny<RoomCategory>()), Times.Once);
            _context.Verify(m => m.SaveChanges(), Times.Once);
            Assert.Equal(category.Id, result.Id);
        }

        [Fact]
        public void DeleteRoomCategory()
        {
            var rooms = TestData.Create.Rooms(3);
            var roomCategory = TestData.Create.RoomCategory(7, rooms: rooms);
            var roomMock = DbSetMock.Create(rooms.ToArray());
            var roomCategoryMock = DbSetMock.Create(roomCategory);

            _context.Setup(c => c.Rooms).Returns(roomMock.Object);
            _context.Setup(c => c.RoomCategories).Returns(roomCategoryMock.Object);

            _service.DeleteRoomCategory(7);

            roomCategoryMock.Verify(m => m.Remove(It.IsAny<RoomCategory>()), Times.Once);
            _context.Verify(c => c.SaveChanges(), Times.Once);
        }

        [Fact]
        public void GetCategoriesInfo()
        {
            var roomCategories = new []
            {
                TestData.Create.RoomCategory(1, "first category"),
                TestData.Create.RoomCategory(2, "second category")
            };

            _context.Setup(c => c.RoomCategories).Returns(DbSetMock.Create(roomCategories).Object);

            var result = _service.GetCategoriesInfo();

            Assert.Equal(2, result.Count);
            Assert.IsType<List<ItemInfo>>(result);
            Assert.Equal("first category", result.Single(i => i.Id == 1).Name);
            Assert.Equal("second category", result.Single(i => i.Id == 2).Name);
        }
    }
}
