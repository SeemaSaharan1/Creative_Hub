import mysql from "mysql"

export const db = mysql.createConnection({
    host:"localhost",
    user:"Add you user name of DB",
    password:"Enter your password",
    database:"Database name"
})

