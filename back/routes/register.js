var db =require('../database/db');
var express = require('express');
var router = express.Router();
var qs =require('querystring');
var url = require('url');
var bodyParser = require("body-parser");
var createCode = require('./nodemailer/tools');
var sendmail = require('./nodemailer/nodemailer');
const { abort } = require('process');
const { resolve } = require('path');
var info={code:1,msg:"请输入验证码"} //后端返回给前端的信息
var tcode = "";
var time = ""; 

//此中间件的作用是获得请求体字符串，然后转成对象赋值给req.body

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json()); 

//判断请求体的格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象

//发送验证码
router.post('/email',async (req,res,next)=>{  
    // console.log(req.body);   
    var code = createCode();
    // console.log('code',code);
    var result = await db.selectEmail(req.body.email);
    // console.log(result)
    if(!result.length){
        info={
            code:0,
            msg:'验证码已发送'   
        }   
        var mail={
            from:'18630129728@163.com',
            //主题
            subject:'在线图像标记工具验证码',
            //收件人
            to:req.body.email,
            text:'【在线图像标记工具】验证码: '+code+',您当前正在注册在线图像标记工具,十分钟内有效，请勿泄露给他人。'
        }
        tcode = code;
        console.log('tcode',tcode)
        time = (new Date()).getTime();
        await sendmail(mail);
        // console.log('验证码已发送')
    }else{
        info={
            code:1,
            msg:'该邮箱已注册过'           
        }
        // console.log('该邮箱已注册过')
    }
    res.json(info);
})

//点击注册
router.post('/message', async function(req,res,next){
    var name = `用户${req.body.email.substr(0, 6)}`,
        email = req.body.email,
        confirmcode = req.body.confirmcode,//验证码
        pass = req.body.pass;
        console.log(email,pass)
        // console.log(name)
    var result = await db.selectEmail(req.body.email);
    // console.log('res',result);
    if(!result.length){
        var now = (new Date()).getTime();
        if(confirmcode == tcode && now-time <= 600000){
            // msg = {uname:'亲爱的小西瓜',pass:'lu',email:'123@163.com',uid:'0004'}
            var user={
                uname:name,
                email:email,
                pass:pass
            };
            var add = await db.addMsg('user',user);
            console.log('add',add);
            if(add === 0 ){
                info={
                    code:0,
                    msg:"注册成功"
                }       
            }else{
                info={
                    code:1,
                    msg:"注册失败，请重试"
                }  
            }
        }else{
            if(pass != tcode){
                info={
                    code:2,
                    msg:"验证码错误"
                }
            }else if( now - time > 60000 ){
                info ={
                    code:3,
                    msg:"验证码已失效"
                }
            }
        }
    }else{
        info={
            code:4,
            msg:'该邮箱已注册过'    
        }
    }
  
    res.json(info);
});


module.exports = router;