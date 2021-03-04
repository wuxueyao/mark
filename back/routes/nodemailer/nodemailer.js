//发送邮件的配置信息
const nodemailer = require('nodemailer');

const config ={
    host:'smtp.163.com',
    port:465,
    auth:{
        user:'18630129728@163.com',
        pass:'RCJELOJPXIAXBFRY'
    }
};

const transporter = nodemailer.createTransport(config);

module.exports = function(mail){
    // var mail={
    //     from:'18630129728@163.com',
    //     //主题
    //     subject:'在线图像标记工具验证码',
    //     //收件人
    //     to:"2693088968@qq.com",
    //     text:'【在线图像标记工具】验证码: '+'123321'+',您当前正在注册在线图像标记工具,十分钟内有效，请勿泄露给他人。'
    // }
    transporter.sendMail(mail,function(err,info){
        if(err){
            return console.log(err);
        }
        console.log('mail sent',info.response);
    });
};

