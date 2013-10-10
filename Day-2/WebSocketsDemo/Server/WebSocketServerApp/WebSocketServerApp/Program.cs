using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebSocketServerApp
{
    class Program
    {
        static void Main(string[] args)
        {

            var server = new WebSocketServer("ws://localhost:9090/SocketServer");
            List<IWebSocketConnection> conns = new List<IWebSocketConnection>();
            server.Start(con => {
                con.OnOpen = () =>
                {
                    conns.Add(con);
                    Console.WriteLine("A new connection is opened..");
                };
                con.OnClose = () =>
                {
                    conns.Remove(con); ;
                    Console.WriteLine("An existing connection is closed");
                };
                con.OnMessage = (m) => {
                    Console.WriteLine("Message received - {0}",m);
                    foreach (var connection in conns)
                    {
                        if (connection != con)
                            connection.Send(m);
                    }
                };

            });
            Console.WriteLine("Enter any text to send to client OR 'exit' to shutdown");
            var input = string.Empty;
            while ((input = Console.ReadLine()).ToUpper() != "EXIT") {
                foreach (var connection in conns)
                {
                    connection.Send(input);
                }
            } 
        }

        
    }
}
