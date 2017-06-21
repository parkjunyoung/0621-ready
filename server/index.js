


import express from 'express';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config(); // LOAD CONFIG
 
const app = express();
 
let port = 3000;

import Sequelize from 'sequelize';

const sequelize = new Sequelize( process.env.DATABASE , process.env.DB_USER , process.env.DB_PASSWORD , {
  host:  process.env.DB_HOST ,
  dialect: 'mssql',
  dialectOptions: {
    encrypt: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  port : 80
});

sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});

// SERVE STATIC FILES - REACT PROJECT
app.use('/', express.static( path.join(__dirname, '../public') ));

app.get('*', function(req,res){
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});
 
app.get('/', (req, res) => {
    res.send('Es6 export Import11111');
}); 
 
const server = app.listen(port, () => {
    console.log('Express listening on port', port);
})