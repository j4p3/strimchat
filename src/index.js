const WebSocket = require('ws');

import Message from './message';

const port = 8082;
const wss = new WebSocket.Server({ port: port });

// Broken connection handling

const noop = () => {}
const refreshClients = () => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive == false) return ws.terminate();
    ws.isAlive = false;
    ws.ping(noop);
  });
}
const expireSchedule = setInterval(refreshClients, 30000);

// Broadcasting

const broadcast = (message, author = undefined) => {
  wss.clients.forEach((ws) => {
    if (ws !== author && ws.readyState == WebSocket.OPEN) {
      ws.send(JSON.stringify(message))
    }
  })
}

// Connection handling

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });

  ws.on('message', (data) => {
    console.log('chat: message received');
    try {

      // @todo: multiple message types including "echo" of previous message
      const dataObject = JSON.parse(data);
      let message = new Message(dataObject)
      broadcast(message, ws)

    } catch (e) {
      // @todo: formalize system messages
      console.log(e);
      if (e.hasOwnProperty('code') && e.code == 0) {
        ws.send('Error: invalid message format.');
        return;
      }
      if (e instanceof SyntaxError) {
        ws.send('Error: invalid message format.');
        return;
      }
    }
  })
});
