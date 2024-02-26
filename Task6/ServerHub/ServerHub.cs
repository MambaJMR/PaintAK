using Microsoft.AspNetCore.SignalR;

namespace Task6.ServerHub
{
    public class ServerHub : Hub
    {
        public async Task Send(string message)
        {
            await this.Clients.All.SendAsync("Send", message);
        }
    }
}
