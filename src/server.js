const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
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

// conexão com banco
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

// api lidando com json
app.use(express.json());
// permitir envio de arquivos nas requisições
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// toda vez que acessar a rota files, buscar os arquivos dentro de tmp
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
// utilizando arquivo de rotas
app.use(require('./routes'));

// abrindo servidor
server.listen(process.env.PORT || 3333);