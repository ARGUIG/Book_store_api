const asyncHandler = require("express-async-handler");
const { User, validateLoginUser, validateRegisterUser, validateUpdateUser} = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

/** 
 * @desc    Register new User
 * @route   /api/auth/
 * @method  POST
 * @access  public
 */
const register = asyncHandler( async (req,res) => {
    const {error} = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }
    let user = await User.findOne({ email : req.body.email });
    if (user){
        return res.status(400).json({ message : "this user already regitered"});
    }

    const salt = await bcrypt.genSalt(10);  // generate hashing 
    // password = "amine123" => password = "eafuhouh"
    req.body.password = await bcrypt.hash( req.body.password, salt );

    user = new User ({
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password,
    });
    const result = await user.save();
    const token = user.generateToken();
    const { password , ...other} = result._doc;

    res.status(201).json({...other, token});
    }
)

/** 
 * @desc    Login new User
 * @route   /api/auth/
 * @method  POST
 * @access  public
 */
const login = asyncHandler( async (req,res) => {
    const {error} = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }
    let user = await User.findOne({ email : req.body.email });
    if (!user){
        return res.status(400).json({ message : "invalid Email or Password"});
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password,user.password)
    if (!isPasswordMatch){
        return res.status(400).json({ message : "invalid Email or Password"});
    }

    const token = user.generateToken();
    const { password , ...other} = user._doc;
    res.status(200).json({...other, token});
    }
)

module.exports = {
    register,
    login,
}
