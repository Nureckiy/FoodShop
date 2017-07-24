using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Models.DataModels;

namespace Hohotel.Models
{
    public class PreviewCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CoverUrl { get; set; }
        public decimal? MinPrice { get; set; }
    }
}
