using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Hohotel.Exceptions
{
    public class UnavailableException : Exception
    {
        public UnavailableException()
            : base() { }

        public UnavailableException(string message)
            : base(message) { }

        public UnavailableException(string format, params object[] args)
            : base(string.Format(format, args)) { }

        public UnavailableException(string message, Exception innerException)
            : base(message, innerException) { }

        public UnavailableException(string format, Exception innerException, params object[] args)
            : base(string.Format(format, args), innerException) { }
    }
}
