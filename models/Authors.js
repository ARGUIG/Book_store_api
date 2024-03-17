const mongoose = require("mongoose");
const Joi = require("joi");

const authorSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true ,
        minlength : 3,
        maxlength : 50
    },
    lastName : {
        type : String,
        required : true,
        trim : true ,
        minlength : 3,
        maxlength : 50
    },
    nationality : {
        type : String,
        required : true,
        trim : true ,
        minlength : 2,
        maxlength : 50
    },
},
{
    timestamps : true,
})

const Authors = mongoose.model("Authors", authorSchema);

// validation Create author
function validateCreateAuthor(obj){
    const schema = Joi.object({
        firstName : Joi.string().trim().required().max(50).min(3),
        lastName : Joi.string().trim().required().max(50).min(3),
        nationality : Joi.string().trim().required().max(50).min(2),
    });
    return schema.validate(obj);
}
// validation Update Author
function validateUpdateAuthor(obj){
    const schema = Joi.object({
        firstName : Joi.string().trim().max(50).min(3),
        lastName : Joi.string().trim().max(50).min(3),
        nationality : Joi.string().trim().max(50).min(2),
    });
    return schema.validate(obj);
}

module.exports = {
    Authors, validateCreateAuthor, validateUpdateAuthor
}