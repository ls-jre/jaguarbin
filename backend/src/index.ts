import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { seedDB } from './db/mongo/seed';
import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);

// Set up socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.set('io', io);

server.listen(config.PORT, () => {
  console.log(`JaguarBin backend running on ${config.PORT}`);

  mongoose
    .connect(config.MONGO_URI || '')
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .then(() => seedDB(true)) // pass true if you want to guarantee
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
    });
});
