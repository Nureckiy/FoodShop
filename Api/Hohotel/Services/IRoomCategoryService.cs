using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Models;
using Hohotel.Models.DataModels;

namespace Hohotel.Services
{
    public interface IRoomCategoryService
    {
        IList<PreviewCategory> GetRoomCategories();

        FullRoomCategory GetRoomCategoryById(int id);

        void AddRoomCategory(RoomCategory category, string userId);

        void EditRoomCategory(RoomCategory category, string userId);

        IList<ItemInfo> GetCategoriesInfo();
    }
}
