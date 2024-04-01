const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity")

// Create User Schema
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true ,
        minlength : 5,
        maxlength : 100,
        unique : true,
    },
    firstName : {
        type : String,
        required : true,
        trim : true ,
        minlength : 2,
        maxlength : 200,
    },
    lastName : {
        type : String,
        required : true,
        trim : true ,
        minlength : 2,
        maxlength : 200,
    },
    password : {
        type : String,
        required : true,
        trim : true ,
        minlength : 6
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
},{ timestamps : true } );


// Generate Token 
function generateToken(){
    return jwt.sign({ id:this._id, isAdmin:this.isAdmin}, process.env.JWT_SECRET_KEY, {expiresIn:"2h"})
};
userSchema.methods.generateToken = generateToken;


// Create User Model
const User =  mongoose.model("User",userSchema);

// Validation register User
function validateRegisterUser(obj){
    const schema = Joi.object({
        email : Joi.string().trim().required().min(5).max(100).email(),
        firstName : Joi.string().trim().required().min(2).max(200),
        lastName : Joi.string().trim().required().min(2).max(200),
        password : passwordComplexity.required(),
    });
    return schema.validate(obj);
}

// Validation Login User
function validateLoginUser(obj){
    const schema = Joi.object({
        email : Joi.string().trim().required().min(5).max(100).email(),
        password : Joi.string().trim().required().min(6),
    });
    return schema.validate(obj);
}

// Validation Update User
function validateUpdateUser(obj){
    const schema = Joi.object({
        email : Joi.string().trim().min(5).max(100).email(),
        firstName : Joi.string().trim().min(2).max(200),
        lastName : Joi.string().trim().min(2).max(200),
        password : Joi.string().trim().min(6),
    });
    return schema.validate(obj);
}

// Validation Update password
function validateUpdatePassword(obj){
    const schema = Joi.object({
        password : Joi.string().trim().min(6),
    });
    return schema.validate(obj);
}

module.exports = {
    User,
    validateLoginUser,
    validateRegisterUser,
    validateUpdateUser,
    validateUpdatePassword,
    generateToken
}