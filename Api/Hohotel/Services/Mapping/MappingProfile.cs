using AutoMapper;
using Hohotel.Models;
using Hohotel.Models.DataModels;

namespace Hohotel.Services.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<RoomCategory, FullRoomCategory>();

            CreateMap<RoomCategory, PreviewCategory>();

            CreateMap<OrderInfo, Order>()
                .ForMember(o => o.DishPortionOrders, i => i.MapFrom(o => o.Portions));

            CreateMap<Order, OrderView>()
                .ForMember(v => v.Portions, o => o.MapFrom(i => i.DishPortionOrders))
                .ForMember(v => v.DishPortionOrders, o => o.Ignore());

            CreateMap<DishPortionOrder, DishPortionOrderView>()
                .ForMember(dp => dp.Id, o => o.MapFrom(dpi => dpi.DishPortionId))
                .ForMember(dp => dp.ParentName, o => o.MapFrom(dpi => dpi.DishPortion.Parent.Name))
                .ForMember(dp => dp.Size, o => o.MapFrom(dpi => dpi.DishPortion.Size))
                .ForMember(dp => dp.Weight, o => o.MapFrom(dpi => dpi.DishPortion.Weight))
                .ForMember(dp => dp.Price, o => o.MapFrom(dpi => dpi.DishPortion.Price))
                .ForMember(dp => dp.Count, o => o.MapFrom(dpi => dpi.Count));


            CreateMap<Booking, BookingView>()
                .ForMember(v => v.Rooms, o => o.MapFrom(b => b.RoomBookings))
                .ForMember(v => v.RoomBookings, o => o.Ignore());

            CreateMap<RoomBooking, RoomBookingView>()
                .ForMember(r => r.Id, o => o.MapFrom(rb => rb.RoomId))
                .ForMember(r => r.StartDate, o => o.MapFrom(rb => rb.StartDate))
                .ForMember(r => r.EndDate, o => o.MapFrom(rb => rb.EndDate))
                .ForMember(r => r.Category, o => o.MapFrom(rb => rb.Room.Category))
                .ForMember(r => r.Address, o => o.MapFrom(rb => rb.Room.Address))
                .ForMember(r => r.Description, o => o.MapFrom(rb => rb.Room.Description))
                .ForMember(r => r.ImageUrl, o => o.MapFrom(rb => rb.Room.ImageUrl))
                .ForMember(r => r.Price, o => o.MapFrom(rb => rb.Room.Price));

            CreateMap<RoomCategory, ItemInfo>();

            CreateMap<UpdateStatusModel, Booking>();
        }
    }
}
