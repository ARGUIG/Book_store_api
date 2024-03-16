const mongoose = require("mongoose");
const Joi = require("joi");
const { Authors } = require("./Authors");

const BooksSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true ,
        trim : true ,
        minlength : 3 ,
        maxlength : 200
    },
    author : {
        type : mongoose.Schema.Types.ObjectID,
		ref : Authors,  // model reference
        required : true,
    },
    description : {
        type : String,
        required : true ,
        trim : true ,
        minlength : 3 ,
        maxlength : 500
    },
    price : {
        type : Number,
        required : true ,
        minlength : 0 
    },
    cover : {
        type : String
    }
},
{
    timestamps : true,
})

const Book = mongoose.model("Books", BooksSchema);

// Create book validation
function createBookValidation(obj){
    const schema = Joi.object({
        title : Joi.string().trim().required().max(100).min(3),
        author : Joi.string().trim().required().max(100).min(3),
        description : Joi.string().trim().required().max(200).min(6),
        price : Joi.number().required().min(0),
        cover : Joi.string()
    })
    return schema.validate(obj);
}
// Update book validation
function updateBookValidation(obj){
    const schema = Joi.object({
        title : Joi.string().trim().max(100).min(3),
        author : Joi.string().trim().max(100).min(3),
        description : Joi.string().trim().max(200).min(6),
        price : Joi.number().min(0),
        cover : Joi.string()
    })
    return schema.validate(obj)
} 

module.exports = {
    Book, createBookValidation, updateBookValidation
}