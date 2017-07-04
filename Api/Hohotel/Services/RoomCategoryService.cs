using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Microsoft.EntityFrameworkCore;

namespace Hohotel.Services
{
    public class RoomCategoryService: IRoomCategoryService
    {
        private readonly HohotelContext _context;

        public RoomCategoryService(HohotelContext context)
        {
            _context = context;
        }

        public IList<PreviewCategory> GetRoomCategories()
        {
            return _context.RoomCategories
                .AsNoTracking()
                .Select(category => new PreviewCategory(category)
                {
                    MinPrice = _context.Rooms
                        .Where(room => room.Category == category)
                        .Select(room => room.Price)
                        .DefaultIfEmpty().Min()
                })
                .ToList();
        }

        public FullRoomCategory GetRoomCategoryById(int id)
        {
            var rooms = _context.Rooms.Where(room => room.Category.Id == id);
            return _context.RoomCategories
                .AsNoTracking()
                .Where(category => category.Id == id)
                .Select(category => new FullRoomCategory(category)
                {
                    MinPrice = rooms.Select(room => room.Price)
                        .DefaultIfEmpty().Min(),
                    Images = rooms.Select(room => room.ImageUrl)
                })
                .FirstOrDefault();
        }
    }
}
