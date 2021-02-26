const express = require('express');
const app = express();
const db = require('./db');

db.connect((err)=>{
    if(err) throw err;
    console.log('数据库连接成功!')
})

async function login(uid){
    // uid = '0001'
    let sql = `SELECT * FROM picture WHERE uid='${uid}'`;
    let retdata = db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
    // console.log('retdata'+retdata)

}

async function addPicturer(msg){
    // msg = {pname:'这个标记是我做的记号',pid:'0001',uid:'0001'}
    let sql = 'INSERT INTO picture SET  ?';
    let retdata = db.query(sql,msg,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
    // console.log('retdata'+retdata)
}
async function changeById(pname,pid){
    pname = 'holi'
    let sql = `UPDATE picture SET pname = ${pname} WHERE pid = '${pid}'`;
    let retdata = db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
    
}
async function delPicture(pid){
    // pid = '0001'; 
    let sql = `DELETE FROM picture WHERE pid = '${pid}'`;
    let sql1= `DELETE FROM mark WHERE pid = '${pid}'`;
    db.query(sql1);
    let retdata = db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
}


async function findIdByName(pname){ 
    // pname = '安怡'
    let sql = `SELECT * FROM picture WHERE pname like '%${pname}%'`;
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