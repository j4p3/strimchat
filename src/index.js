// ========================================================================= //
// 
// Webserver for:
//  chat application
// 
// ========================================================================= //


const WebSocket = require('ws');

import Message from './message';

const PORT = process.env.STRIMCHAT_PORT;
const wss = new WebSocket.Server({ port: PORT });

console.log('chat: listening on port ' + PORT);

// 
// Broken connections
// 

const noop = () => {}
const refreshClients = () => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive == false) return ws.terminate();
    ws.isAlive = false;
    ws.ping(noop);
  });
}
const expireSchedule = setInterval(refreshClients, 30000);

// 
// Error handling
// 

const handleError = (e, ws) => {
  // @todo: formalize system messages
  if (e.hasOwnProperty('code') && e.code == 0) {
    ws.send('Error: invalid message format.');
    return;
  }
  if (e instanceof SyntaxError) {
    ws.send('Error: invalid message format.');
    return;
  }
}

// 
// Broadcasting
// 

const broadcast = (message, author = undefined) => {
  wss.clients.forEach((ws) => {
    if (ws !== author && ws.readyState == WebSocket.OPEN) {
      ws.send(JSON.stringify(message))
    }
  })
}

// 
// Connection lifecycle
// 

const listen = (ws) => {

  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });

  const receive = (data) => {
    try {
      // @todo: multiple message types including "echo" of previous message
      const dataObject = JSON.parse(data);
      let message = new Message(dataObject)

      broadcast(message, ws)
      message.save();

    } catch (e) {
      handleError(e, ws);
    }
  }

  ws.on('message', (data) => receive(data));
}

wss.on('connection', (ws) => listen(ws));
