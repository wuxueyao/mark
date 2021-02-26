const express = require('express');
const app = express();
const db = require('./db');

db.connect((err)=>{
    if(err) throw err;
    console.log('数据库连接成功!')
})

async function login(email,pass){
    // let email="123@163.com";
    // let pass = "lu";
    let sql = `SELECT * FROM user WHERE email = '${email}' and pass = '${pass}'`;
    let retdata = db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
    console.log('retdata'+retdata)
}


async function findemail(email){
    // let email="123@163.com";
    let sql = `SELECT * FROM user WHERE email = '${email}'`;
    let retdata = db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
        console.log('retdata'+retdata)
    });
}
// let sql = 'select * from user';
async function addUser(msg){
    let sql = 'INSERT INTO user SET  ?';
    msg = {uname:'亲爱的小西瓜',pass:'lu',email:'123@163.com',uid:'0003'}
    let retdata = db.query(sql,msg,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
    // console.log('retdata'+retdata)
}

async function delUser(uid){
    uid = '0001'
    let sql1 = `DELETE FROM mark WHERE uid = '${uid}'`;
    let sql2= `DELETE FROM picture WHERE uid = '${uid}'`;
    let sql3 = `DELETE FROM user WHERE uid = '${uid}'`;
    db.query(sql1);
    db.query(sql2);
    let retdata = db.query(sql3,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
}

async function findIdByemail(email){ 
    let sql = `SELECT uid FROM user WHERE email = '${email}`;
    let retdata = db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
}

async function findemailById(uid){
    let sql = `SELECT email FROM user WHERE uid = '${uid}'`;
    let retdata = db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
}

async function findUsers(){
    let sql = 'SELECT * FROM user';
    let retdata = db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
}

async function changeById(msg,uid){
    let msg =`uname="hilo",pass="123"`
    let uid = '0009'
    let sql = `UPDATE user SET ${msg} WHERE uid = '${uid}'`;
    let retdata = db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
    
}
db.end();