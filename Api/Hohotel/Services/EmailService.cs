using System;
using Hohotel.Models;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Hohotel.Services
{
    public class EmailService: IMailService
    {
        private readonly AppConfiguration _configuration;

        public EmailService(IOptions<AppConfiguration> configuration)
        {
            _configuration = configuration.Value;
        }

        public void SendFeedback(Feedback feedback, string userId)
        {
            var message = CreateEmail(feedback);

            using (var client = new SmtpClient())
            {
                client.Connect(_configuration.EmailHost, 587, false);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate(_configuration.EmailAddress, _configuration.EmailPassword);
                client.Send(message);
                client.Disconnect(true);
            }
        }

        private MimeMessage CreateEmail(Feedback feedback)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(feedback.UserName, feedback.Email));
            message.To.Add(new MailboxAddress("Hohotel", _configuration.EmailAddress));
            message.Subject = string.Format("{0} via Hohotel feedback", feedback.UserName);
            message.Body = new TextPart("plain")
            {
                Text = String.Format("user {0} send message:\n{1}", feedback.UserId, feedback.Message)
            };
            return message;
        }
    }
}
