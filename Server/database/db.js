import mysql from 'mysql'

const con = mysql.createConnection({
    host :'localhost',
    user : "root",
    password : "",
    database : "EmployeemSystem"
})

con.connect(function (err) {
    if (err) {
        console.log("connection error:", err);
    }
    else {
        console.log("connected successfully");
    }
})
export default con;