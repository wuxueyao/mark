const express = require('express');
const mysql = require('mysql');
const database = mysql.createConnection({
    host:"localhost",
    user:'root',
    // password:'123321',
    database:'picturemark',
    port:3306
})
database.connect((err)=>{
    if(err) throw err;
    console.log('数据库连接成功!')
})

/* 注册登录 */
/**
 * 注册时操作的表是user，查看邮箱是否已注册
 * 通过邮箱查找用户
 * @param {string} email 
 */
async function selectEmail(email){
    let sql = `SELECT * FROM user WHERE email = '${email}'`;
    return new Promise(resolve => {
        database.query(sql,(err,result)=>{
            if(err){
                return err;
            }else{
                // console.log(result);
                resolve(result);
            }
        });
    });
}

/**
 * 通过邮箱和密码登录，数据表是user
 * @param {string} email 
 * @param {string} pass 
 */
async function login(email,pass){
    // let email="123@163.com";
    // let pass = "lu";
    let sql = `SELECT * FROM user WHERE email = '${email}' and pass = '${pass}'`;
    return new Promise(resolve => {
        database.query(sql,(err,result)=>{
            if(err){
                return err;
            }else{
                resolve(result);
            }
        });
    });
    // console.log('retdata'+retdata)
}
/**
 * 登录工具之后可以看到该用户添加到工具中的图片，数据表是picture
 * @param {string} uid 
 */
async function showPictures(uid){
    // uid = '0001'
    let sql = `SELECT * FROM picture WHERE uid='${uid}'`;
    return new Promise(resolve => {
        database.query(sql,(err,result)=>{
            if(err){
                return err;
            }else{
                // console.log(result);
                resolve(result);
            }
        });
    });
    // console.log('retdata'+retdata)

}
/**
 * 打开操作过的图片可以看到该图片之前做好的标记，数据表是mark
 * @param {string} uid 
 * @param {string} pid 
 */
async function openPicture(uid,pid){
    // uid = '0001'
    let sql = `SELECT * FROM mark WHERE uid='${uid}' AND pid = '${pid}'`;
    return new Promise(resolve => {
        database.query(sql,(err,result)=>{
            if(err){
                return err;
            }else{
                // console.log(result);
                resolve(result);
            }
        });
    });
    // console.log('retdata'+retdata)

}

/* 增删改查 */
/**
 * 向数据库中添加数据
 * user，picture，mark 添加数据都在这里添加 传入要操作的表名和数据即可
 * 因为这个是新增数据 所以不用考虑是哪个表的id
 * @param {string} table 
 * @param {object} msg 
 */
async function addMsg(table,msg){
    // table='picture'
    // msg = {uname:'亲爱的小西瓜',pass:'lu',email:'123@163.com',uid:'0005'}
    let sql = `INSERT INTO ${table} SET  ?`;
    // let sql = `INSERT INTO ${table} SET  ?`;
    // msg = {pname:'这个标记是我做的记号',pid:'0001',uid:'0003'}
    return new Promise(resolve => {
        database.query(sql,msg,(err,result)=>{
            if(err){
                resolve(1);
            }else{
                // console.log(result);
                resolve(0);
            }
        });
    });
}

/**
 * 删除指定表中的指定数据
 * 删除user表中的数据 需要同时删掉该uid所对应的picture表和mark表中的数据
 * 删除picture表中的数据 需要删掉该pid所对应的mark表中的数据
 * 删除mark表中的数据 只需要删掉该数据即可
 * @param {string} table 
 * @param {string} id 
 */
async function delMsg(table,id){
    var field;
    switch(table){
        case 'user':
            field = 'uid';
            let sql1 = `DELETE FROM mark WHERE uid = '${id}'`;
            let sql2= `DELETE FROM picture WHERE uid = '${id}'`;
            database.query(sql1);
            database.query(sql2);
            break;
        case 'picture':
            field = 'pid';
            let sql1= `DELETE FROM mark WHERE pid = '${id}'`;
            database.query(sql1);
            break;
        case 'mark':
            field = 'mid';
            break;
        default:
            break;

    }
    let sql = `DELETE FROM ${table} WHERE ${field} = '${id}'`;
    return new Promise(resolve => {
        database.query(sql,(err,result)=>{
            if(err){
                return err;
            }else{
                // console.log(result);
                resolve(result);
            }
        });
    });
}

/**
 * 修改数据库中原有的数据
 * 需要传入表名 要更改的数据 以及id号 
 * id只需要传号即可 根据表名可以知道是哪个id
 * @param {string} table 
 * @param {string} msg 
 * @param {string} id 
 */
async function editById(table,msg,id){
    // table='picture';
    // let msg =`pname = 'holi'`
    // let msg =`note="第二次测试",coordinate = "{width:200,height:900}"`
    // let msg =`uname="hilo",pass="123"`
    // let id = '0001'
    var field;
    switch(table){
        case 'user':
            field = 'uid';
            break;
        case 'picture':
            field = 'pid';
            break;
        case 'mark':
            field = 'mid';
            break;
        default:
            break;

    }
    let sql = `UPDATE ${table} SET ${msg} WHERE ${field} = '${id}'`;
    return new Promise(resolve => {
        database.query(sql,(err,result)=>{
            if(err){
                return err;
            }else{
                // console.log(result);
                resolve(result);
            }
        });
    });
    
}

/**
 * 查询user表或者picture表中name含有某些关键字的数据
 * @param {string} table 
 * @param {string} name
 */
async function selectMsgByName(table,name){
    // var table = 'picture';
    // var name = '安怡';
    var field;
    switch(table){
        case 'user':
            field = 'uname';
            break;
        case 'picture':
            field = 'pname';
            break;
        default:
            break;

    }
    let sql = `SELECT * FROM ${table} WHERE ${field} LIKE '%${name}%'`;
    return new Promise(resolve => {
        database.query(sql,(err,result)=>{
            if(err){
                return err;
            }else{
                // console.log(result);
                resolve(result);
            }
        });
    });
}

/**
 * 查询user表和picture表中所有的数据
 * @param {string} table 
 */
async function selectMsg(table){
    let sql = `SELECT * FROM ${table}`;
    return new Promise(resolve => {
        database.query(sql,(err,result)=>{
            if(err){
                return err;
            }else{
                // console.log(result);
                resolve(result);
            }
        });
    });
}

var db = {
    selectEmail,
    login,
    showPictures,
    openPicture,
    addMsg,
    delMsg,
    editById,
    selectMsgByName,
    selectMsg
}
module.exports = db;
// database.end();


