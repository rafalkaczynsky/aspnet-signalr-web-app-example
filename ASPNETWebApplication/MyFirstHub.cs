using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace ASPNETWebApplication
{
    public class MyFirstHub : Hub
    {

 
        public void Send(string name, string message)
        {
            //Call the broadcast method to update clients,
            Clients.All.broadcastMessage(name, message);
        }
    }
}