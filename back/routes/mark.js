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
    console.log(req.body);
    
})


module.exports = router;