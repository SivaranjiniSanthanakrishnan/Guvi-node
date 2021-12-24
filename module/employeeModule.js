const mongo = require('../shared/connect');
const {ObjectId} = require("bson");

module.exports.getEmployees = async (req,res,next) => {
    try {
        var data = await mongo.db.collection("employees").find().toArray();
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.getEmployee = async (req,res,next) => {
    try {
        var data = await mongo.db.collection("employees").findOne({_id: ObjectId(req.params.id)})
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.createEmployee = async (req,res,next) => {
    try {
        var data = await mongo.db.collection("employees").insertOne(req.body);
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.updateEmployee = async (req,res,next) => {
    try {
        var data = await mongo.db.collection("employees").updateOne({_id: ObjectId(req.params.id)}, {$set: {name: req.body.name, age: req.body.age}});
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.deleteEmployee = async (req,res,next) => {
    try {
        var data = await mongo.db.collection("employees").remove({_id: ObjectId(req.params.id)});
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}