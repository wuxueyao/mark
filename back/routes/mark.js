const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
const db = require("../database/db");//引入数据库
const fs = require('fs');
//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

// 点击图像展示标注
router.post('/show',async function(req,res,next){
    // console.log(req.body)
    var uid = req.body.uid;
    var pid = req.body.pid;
    var showMarks = await db.openPicture(uid,pid);
    var message = {
        code:0,
        data:showMarks
    }
    res.json(message)
})


router.post('/',async function(req,res,next){
    var uid = req.body.uid;
    var msgarr = req.body.msg.split(',');
    for(var i=0;i<msgarr.length;i++){
        var a=msgarr[i].split('=');
        a[1]=`"${a[1]}"`
        msgarr[i]=`${a[0]}=${a[1]}`
    }
    var msg = msgarr.join(',')
    var edit = await db.editById('user',msg,uid);
    var data = await db.selectMsg('mark');
    if(data.length == 0){
        res.json(null)
    }else{
        res.json(data)
    }
})


module.exports = router;