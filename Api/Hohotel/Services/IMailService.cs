using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Models;

namespace Hohotel.Services
{
    public interface IMailService
    {
        void SendFeedback(Feedback feedback, string userId);
    }
}
