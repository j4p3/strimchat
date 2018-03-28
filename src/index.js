import http from 'http';

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('');
}).listen(8081, '127.0.0.1');

console.log('chat: server running at http://127.0.0.1:8081/')
