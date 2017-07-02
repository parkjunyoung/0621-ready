


import express from 'express';
import path from 'path';
import db from './models';

import logger from 'morgan';
import bodyParser from 'body-parser';

import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';


import admin from './routes/admin';
import accounts from './routes/accounts';

const app = express();
 
let port = 3000;

// DB authentication
db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return db.sequelize.sync();
    })
    .then(() => {
        console.log('DB Sync complete.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
});


// logger
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 


// SERVE STATIC FILES - REACT PROJECT
app.use('/', express.static( path.join(__dirname, '../public') ));

// 이미지 업로드 폴더 static 추가
app.use('/uploads', express.static( path.join(__dirname, '../uploads') ));

//세션 관련 셋팅
app.use(session({
    secret: 'ebay',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2000 * 60 * 60 //지속시간 2시간
    }
}));
 
//passport 적용
app.use(passport.initialize());
app.use(passport.session());



//라우팅
app.use('/api/admin', admin);
app.use('/api/accounts', accounts);

app.get('*', function(req,res){
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});
 
app.get('/', (req, res) => {
    res.send('Es6 export Import11111');
}); 
 
const server = app.listen(port, () => {
    console.log('Express listening on port', port);
})