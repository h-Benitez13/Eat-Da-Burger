var connection = require("../config/connection.js");

// Helper function for SQL syntax.

function helperQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}


    // helper function to convert object key/value pairs to SQL syntax
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    for (var key in ob) {
      var value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
       
        arr.push(key + "=" + value);
      }
    }
  
    return arr.toString();
  }

// object for all our SQL statement functions

var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";" ;
        connection.query(queryString, function (err, result){
            if (err){
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function(table,cols,vals,cb){
        var queryString = "Insert into " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += helperQuestionMarks (vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result){
            if(err) {
                throw err;
            }
            cb(result);
        });
    },
    updateOne: function (table, objColVals, condition, cb){
        var queryString = "UPDATE " + table;

        querString += " SET ";
        querString += objToSql (objColVals);
        querString += " WHERE ";
        querString += condition;

        console.log(queryString);

        connection.query (queryString, function (err, result){
            if (err) {
                throw err;
            }
            cb (result);
        });
    },
    deleteOne: function (table, condition, cb){
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result){
            if (err){
                throw err;
            }
            cb(result);
        });
    }
};

module.exports = orm;

