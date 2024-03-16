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
    age : {
        type : Number,
        required : true,
        minlength : 0
    },
    nationnality : {
        type : String,
        required : true,
        trim : true ,
        minlength : 3,
        maxlength : 50
    },
    image : {
        type : String,
        default : "default-avatar.png",
        required : false
    }
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
        age : Joi.number().required().min(0),
        nationnality : Joi.string().trim().required().max(50).min(3),
        image : Joi.string()
    });
    return schema.validate(obj);
}
// validation Update Author
function validateUpdateAuthor(obj){
    const schema = Joi.object({
        firstName : Joi.string().trim().max(50).min(3),
        lastName : Joi.string().trim().max(50).min(3),
        age : Joi.number().min(0),
        nationnality : Joi.string().trim().max(50).min(3),
        image : Joi.string()
    });
    return schema.validate(obj);
}

module.exports = {
    Authors, validateCreateAuthor, validateUpdateAuthor
}