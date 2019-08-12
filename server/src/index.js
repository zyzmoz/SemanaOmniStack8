const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schemas');

const server = express();
const http = require('http').createServer(server)
const io = require('socket.io')(http);
const connectedUsers = {};

io.on('connection', (socket) => {
  const { id } = socket.handshake.query;
  connectedUsers[id] = socket.id;
  // // socket.join(id);
  // socket.on('like', (id, msg) =>{
  //   console.log('id', id);
  // })
  // console.log('a user connected');
  // const match = { message: 'match' };
  // io.to(id).emit('match', match)
});

//Add IO to all requests
server.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;;
  return next();
});

server.use('*', cors());
server.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true
}));

mongoose.connect('mongodb://localhost/omni', {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true
}).then(() => {
  console.log('Connection with MongoDB established succesfuly!');
}).catch(err => {
  console.log('An error occured while connecting to MondoDB:' + err);
});


//GET, POST, PUT, DELETE
server.get('/', async (req, res) => {

});


http.listen(3000, () => {
  console.log('Server listening on port 3000');
});