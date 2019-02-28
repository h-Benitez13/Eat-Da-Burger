var express = require ("express");

var router = express.Router();

// using the database function from model(burger.js) to use

var burger = require("../models/burger.js");

// lets create ROUTES

router.get("/", function (req, res){
    burger.all(function(data){
        var hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req,res){
    burger.create([
        "name", "devoured"],
        [req.body.burger_name, req.body.devoured
    ], function(result){
        res.json({
            id: result.insertId
        });
    });
});

router.put("/api/burgers/:id", function (req,res){
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured : req.body.devoured
    }, condition, function (result){
        // if no changes were made, the ID must not exist
        if (result.changedRows == 0 ){
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function (req,res){
    var condition = "id " + req.params.id;

    burgers.delete(condition, function (result){
        if (result.affectedRows == 0){
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;