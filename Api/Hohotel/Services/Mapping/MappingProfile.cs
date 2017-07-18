using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Hohotel.Models;
using Hohotel.Models.DataModels;

namespace Hohotel.Services.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<OrderInfo, Order>()
                .ForMember(o => o.DishPortionOrders, i => i.MapFrom(o => o.Portions));
        }
    }
}
