
require('dotenv').config();
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io')
const session = require('express-session')
const path = require('path');
const cookieParser = require('cookie-parser');



const app = express();
const server = createServer(app);
const io = new Server(server);
const db = require('./db')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(require('express-ejs-layouts'))
app.set('views', path.join(__dirname, '../html'));
app.set('view engine', 'ejs');

app.set('layout', 'main.html')
app.engine('html', require('ejs').renderFile);

app.use((req, res, next) => {
  if (req.session.errors == null)
    req.session.errors = []
  next()
})


app.use(express.static(path.join(__dirname, '../public')));
io.on('connection', (socket) => {
  socket.on('start user', (user) => {
    db.query(`select idUserfrom,mensaje,username, fecha
      from message join usuario on message.idUserfrom = usuario.idUser order by fecha asc`,[user] ,(error, result) => {
      if (error) {
        console.log(error)
        return
      }
      socket.emit('mensajes_previos', result)
    })
  })
  

  socket.on('new message', ({ msg, user }) => {
    db.query('insert into message(idUserfrom,idUserto,mensaje) values((select idUser from usersessions where cookie = ? LIMIT 1),9,?);', [user, msg], (error) => {
      if (error) {
        console.log(error)
        return;
      }
      db.query('select usuario.idUser, usuario.username from usersessions join usuario on usersessions.idUser = usuario.idUser where usersessions.cookie = ? LIMIT 1', [user], (error, response) => {
        if (response.length == 0) {
          console.log('no se encontro el usuario')
          return;
        }
        if (error) {
          console.log(error)
          return
        }
        const nuevoMensaje = { user: response[0].username, msg, fecha: new Date() };
        io.emit('to message', nuevoMensaje);
      })

    })
  });
});

app.use(require('../routes/index'))

app.use(require('../routes/iniciar_sesion'))
app.use(require('../routes/registrar'))
app.use(require('../routes/logout'))

app.use(require('./controllers/authentication'))

app.use(require('../routes/chat'))

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});