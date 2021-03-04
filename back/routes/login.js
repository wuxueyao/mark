const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
const db = require("../database/db");//引入数据库
const fs = require('fs');
//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/',async function(req,res,next){
    console.log(req.body)
    var mail = req.body.email;
    var pass = req.body.pass;
    var selectEmail = await db.selectEmail(mail);
    if(selectEmail == 0){
        var message = {code:1,id:null,msg:"该邮箱未注册，请先注册"}
    }else{
        var data = await db.login(mail,pass);
        if(data == 1){
            var message = {code:1,id:null,msg:"邮箱或密码有误"}
        }else{
            var username = '用户' + mail.substring(0,6);
            var message = {code:0,data:{"uid":data.uid,"uname":data.uname,"age":data.uage,"uimg":data.uimg},msg:username+',欢迎回来！'}
        }
    }
    res.json(message)
})


module.exports = router;