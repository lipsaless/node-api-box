const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  });
});

mongoose.connect(
  'mongodb+srv://felipe:felipe@cluster0-tkvb1.mongodb.net/omnistack?retryWrites=true',
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(express.json());
// permitir envio de arquivos nas requisições
app.use(express.urlencoded({ extended: true }));
// toda vez que acessar a rota files, buscar os arquivos dentro de tmp
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(3333);