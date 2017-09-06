using Hohotel.Models;

namespace Hohotel.Services
{
    public interface IMailService
    {
        void SendFeedback(Feedback feedback);
    }
}
