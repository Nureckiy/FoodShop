﻿using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Microsoft.EntityFrameworkCore;

namespace Hohotel.Services
{
    public class RoomCategoryService: IRoomCategoryService
    {
        private readonly HohotelContext _context;
        private readonly IMapper _mapper;

        public RoomCategoryService(HohotelContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IList<PreviewCategory> GetRoomCategories()
        {
            return _context.RoomCategories
                .ProjectTo<PreviewCategory>(_mapper)
                .AsEnumerable()
                .Select(category =>
                {
                    category.MinPrice = _context.Rooms
                        .Where(room => room.Category.Id == category.Id)
                        .Select(room => room.Price)
                        .DefaultIfEmpty().Min();
                    return category;
                })
                .ToList();
        }

        public FullRoomCategory GetRoomCategoryById(int id)
        {
            var result = _context.RoomCategories
                .Where(category => category.Id == id)
                .ProjectTo<FullRoomCategory>(_mapper)
                .SingleOrDefault();
            if (result != null)
            {
                var rooms = _context.Rooms.Where(room => room.Category.Id == id);
                result.MinPrice = rooms.Select(room => room.Price).DefaultIfEmpty().Min();
                result.Images = rooms.Select(room => room.ImageUrl).Where(img => img != null);
            }
            return result;
        }

        public RoomCategory AddRoomCategory(RoomCategory category)
        {
            _context.RoomCategories.Add(category);
            _context.SaveChanges();
            return category;
        }

        public RoomCategory EditRoomCategory(RoomCategory category)
        {
            _context.RoomCategories.Update(category);
            _context.SaveChanges();
            return category;
        }

        public void DeleteRoomCategory(int id)
        {
            var roomCategory = _context.RoomCategories
                .Include(r => r.Rooms)
                .Single(rc => rc.Id == id);
            _context.RoomCategories.Remove(roomCategory);
            _context.SaveChanges();
        }

        public IList<ItemInfo> GetCategoriesInfo()
        {
            return _context.RoomCategories
                .ProjectTo<ItemInfo>(_mapper)
                .ToList();
        }
    }
}
