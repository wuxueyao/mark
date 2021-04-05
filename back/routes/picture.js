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
    
})


module.exports = router;