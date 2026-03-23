const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Koyeb assigns a random port, so we must use this variable
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
