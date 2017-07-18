using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Hohotel.Services.Mapping;

namespace Hohotel.Tests.Mapper
{
    public class AutomapperConfig
    {
        public static IConfigurationProvider GetConfig()
        {
            return new MapperConfiguration(mc => mc.AddProfile<MappingProfile>());
        }
    }
}
