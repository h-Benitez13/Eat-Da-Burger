var mysql = require ("mysql");
var connection = mysql.createConnection ({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "Maimai0513",
    database: "burger_db"
});

connection.connect(function(err){
    if (err) {
        console.log("ERRROR ERROR- error connection " + err.stack);
        return;
    }
    console.log ("connection as id " + connection.threadId);
});

module.exports = connection;