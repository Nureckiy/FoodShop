using System;
using System.Collections.Generic;
using System.Text;

namespace Hohotel.Tests.Factories
{
    public interface ITestDataFactory
    {
    }

    public class TestData : ITestDataFactory
    {
        public static ITestDataFactory Create { get; } = new TestData();
    }
}
