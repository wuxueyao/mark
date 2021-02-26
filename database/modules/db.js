  
const mysql = require('mysql');
const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    // password:'123321',
    database:'picturemark',
    port:3306
})

module.exports = db;
