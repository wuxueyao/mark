const express = require('express');
const app = express();
const db = require('./db');

db.connect((err)=>{
    if(err) throw err;
    console.log('数据库连接成功!')
})

async function operPicture(uid,pid){
    // uid = '0001'
    let sql = `SELECT * FROM mark WHERE uid='${uid}' AND pid = '${pid}'`;
    let retdata = db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
    // console.log('retdata'+retdata)

}

async function addMark(msg){
    // msg = {note:'我做的记号',pid:'0001',coordinate:"[{width:200,height:900},{width:200,height:900}]",uid:'0001'}
    let sql = 'INSERT INTO mark SET  ?';
    let retdata = db.query(sql,msg,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
    // console.log('retdata'+retdata)
}

async function delMark(pid,mid){
    // pid = '0001';
    // uid = '0001';
    let sql = `DELETE FROM mark WHERE mid = '${mid}' AND pid = '${pid}'`;
    let retdata = db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
}

async function changeById(msg,mid){
    // let msg =`uname="hilo",pass="123"`
    let sql = `UPDATE user SET ${msg} WHERE mid = '${mid}'`;
    let retdata = db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
    
}
db.end();


// 用text
// 存的时候先serialize
// 去的时候unserialize