
const socketSetup = (app) => {
  const server = require('http').createServer(app);
  const io = require('socket.io')(server);


  io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id);
    console.log(Object.keys(io.sockets.sockets));
    socket.on('chat message', (msg) => {
      console.log('received msg:', msg);
    });
    socket.emit('send', { hello: 'from server' });
      
  });
  return server;
}


module.exports = socketSetup;
