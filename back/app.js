const express = require('express'),
      app = express(),
      login = require('./routes/login'), //登陆
      resign =require('./routes/register');
      mark =require('./routes/mark');
      mark =require('./routes/picture');
      //image = require('./routes/image'); //单张图片,使用服务器进行存储
    
      
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');  
    res.header('Access-Control-Allow-Methods', '*');  
    res.header('Content-Type', 'application/json;charset=utf-8');   
    next();
});

//路由模块
app.use('/login',login);
app.use('/resign',resign);
app.use('/mark',mark);
app.use('/picture',picture);
//app.use('/image',image);
app.listen(3001);