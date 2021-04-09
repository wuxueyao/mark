const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require("body-parser");
const random = require('string-random');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json({limit:'50mb'}));
router.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
router.use(bodyParser.text());

// 往服务器传图片
router.post('/', function (req, res) {
    var data = req.body.data;
    // var data = jsonBody['_parts'][0][1];
    var dataBuffer = new Buffer(data,'base64')
    var response;
   
    var filename = random(16);
    var des_file =`D:/server/img/${filename}.jpg`;

    fs.writeFile(des_file, dataBuffer, function (err) {
            if(err) {
                response = err;
            }else {
                response = {
                    message: 'File upload successfully',
                    url:`http://127.0.0.1:3001/img/showimg/${filename}.jpg`
                };
                console.log(response);
            }
            res.end(JSON.stringify(response));
    })
});
// 通过url查看图片
router.get('/showimg/:name',function(req,res){
    var filename = req.params.name;
    var buf = fs.readFileSync(`D:/server/img/${filename}`);
    var img = Buffer.from(buf,'base64');
    res.header('Content-Type','image/jpeg');
    res.end(img);
})

// 保存记录
router.post('/modify', async function(req,res,next){
    var pname = req.body.pname,
        imgurl = req.body.imgurl,
        uid = req.body.uid;
        // console.log(name)
    var picture = {
        pname:pname,
        uid:uid,
        imgurl:imgurl
    }
    var add = await db.addMsg('user',picture);
    console.log('add',add);
    if(add === 0 ){
        info={
            code:0,
            msg:"保存成功"
        }       
    }else{
        info={
            code:1,
            msg:"保存失败，请重试"
        }  
    }
    
    res.json(info);
});
module.exports = router;
