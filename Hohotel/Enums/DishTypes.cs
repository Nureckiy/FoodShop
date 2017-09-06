

using System.Runtime.Serialization;

namespace Hohotel.Enums
{
    public enum DishTypes
    {
        [EnumMember(Value = "salads")]
        Salads = 1,

        [EnumMember(Value = "hot")]
        Hot = 2,

        [EnumMember(Value = "pizza")]
        Pizza = 3,

        [EnumMember(Value = "sushi")]
        Sushi = 4
    }
}
