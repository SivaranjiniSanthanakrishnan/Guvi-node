const Joi = require("joi");
const mongo = require('../shared/connect');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req,res,next) => {

    const schema = Joi.object({
        username: Joi.string().min(4).max(15).required(),
        email: Joi.string().email().max(50).required(),
        name: Joi.string().min(4).max(50).required(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        address: Joi.string().min(2).max(50).required(),
        password: Joi.string().min(5).max(15).required(),
        role: Joi.string()
    })

    // Input data validation
    const {error} = await schema.validate(req.body);
    if (error) return res.status(400).send({msg : error.details[0].message});

    // Email already exists validation
    const existUser = await mongo.db.collection("user").findOne({email : req.body.email});
    if(existUser) return res.status(400).send({msg : "Email already exists"});

    // Encrypt password
    const salt = await bcrypt.genSalt(5);
    req.body.password = await bcrypt.hash(req.body.password, salt)
    
    // Save in db
    var data = await mongo.db.collection("user").insertOne(req.body);
    res.send(data);
}

exports.signin = async (req,res,next) => {

    const schema = Joi.object({
        email: Joi.string().email().max(50).required(),
        password: Joi.string().min(5).max(15).required()
    })
     
    // Input data validation
    const {error} = await schema.validate(req.body);
    if (error) return res.status(400).send({msg : error.details[0].message});

    // Is registered user validation
    const existUser = await mongo.db.collection("user").findOne({email : req.body.email});
    if(!existUser) return res.status(400).send({msg : "Email is not registered"});

    // Password compare check
    const isValid = await bcrypt.compare(req.body.password, existUser.password);
    if(!isValid) return res.status(400).send({msg : "Password didn't match"});

    // Generate token
    const token = jwt.sign(existUser, process.env.SECRET_KEY, {expiresIn : '1hr'})
    res.send(token);
}

