const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
const db = require("../database/db");//引入数据库
const fs = require('fs');
//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/',async function(req,res,next){
    // console.log(req.body)
    var mail = req.body.email;
    var pass = req.body.pass;
    var selectEmail = await db.selectEmail(mail);
    // console.log(selectEmail)
    if(!selectEmail.length){
        var message = {code:1,id:null,msg:"该邮箱未注册，请先注册"};
        // console.log(message)
    }else{
        var data = await db.login(mail,pass);
        // console.log(data)
        if(!data.length){
            var message = {code:1,msg:"邮箱或密码有误"}
        }else{
            var message = {
                code:0,
                data:{"uid":data[0].uid,
                    "uname":data[0].uname,
                    "uage":data[0].uage,
                    "uimg":data[0].uimg
                },msg:data[0].uname+',欢迎回来！'}
            console.log(message)
        }
    }
    res.json(message)
})


module.exports = router;