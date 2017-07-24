using AutoMapper;
using Hohotel.Services.Mapping;

namespace Hohotel.Tests.Mapper
{
    public class AutomapperConfig
    {
        public static IMapper Initialize()
        {
            AutoMapper.Mapper.Initialize(mc =>
                mc.AddProfile<MappingProfile>()
            );
            return AutoMapper.Mapper.Instance;
        }
    }
}
