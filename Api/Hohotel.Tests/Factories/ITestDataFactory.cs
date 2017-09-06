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
