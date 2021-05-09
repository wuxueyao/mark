const express = require('express'),
      app = express(),
      login = require('./routes/login'), //登陆
      resign =require('./routes/register'),
      mark =require('./routes/mark'),
      img =require('./routes/img'),
      users = require('./routes/users'),
      pics = require('./routes/pics'),
      marks = require('./routes/marks')
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
app.use('/img',img);
app.use('/users',users);
app.use('/pics',pics);
app.use('/marks',marks);
//app.use('/image',image);
app.listen(3001);