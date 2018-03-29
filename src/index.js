// ****************************************************************************
// Message Schema
// ****************************************************************************
// {
//   timestamp: int64
//   author: string
//   content: string
//   meta: {
//     echos: int
//   }
// }

const WebSocket = require('ws');
const port = 8082;
const wss = new WebSocket.Server({ port: port });

// Broken connection handling

const noop = () => {}
const pulse = () => { this.isAlive = true; }
const refreshClients = () => {
  wss.clients.forEach((client) => {
    if (ws.isAlive == false) return ws.terminate();
    ws.isAlive = false;
    ws.ping(noop);
  })
}
const expireSchedule = setInterval(refreshClients, 30000);

// Broadcasting

const broadcast = (data, authorClient = undefined) => {
  wss.clients.forEach((client) => {
    if (client !== authorClient && client.readyState == WebSocket.OPEN) {
      client.send(data)
    }
  })
}

// Connection handling

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', pulse);

  ws.on('message', (message) => {
    console.log('chat: received message');
    broadcast(message, ws);
  })
});
