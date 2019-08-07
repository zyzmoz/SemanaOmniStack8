const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schemas');

const server =  express();
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
server.get('/', async(req,res) => {  

});


server.listen(3000, () => {
  console.log('Server listening on port 3000');
});