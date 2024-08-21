using Microsoft.AspNetCore.SignalR;

namespace LiveChat.Server.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message, bool isImage)
        {
            //this will send a message from a user to all the connected users 
            await Clients.All.SendAsync("ReceiveMessage", user, message, isImage);
        }
    }
}
