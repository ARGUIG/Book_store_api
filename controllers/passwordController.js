const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

/** 
 * @desc    Get forgot password view
 * @route   /password/forgot-password
 * @method  GET
 * @access  public
 */
const getForgotPasswordView = asyncHandler ( (req,res) => {
    res.render('forgot-password') // render takes the view(html) and send it to the client
})

/** 
 * @desc    Send forgot password Link
 * @route   /password/forgot-password
 * @method  POST
 * @access  public
 */
const sendForgotPasswordLink = asyncHandler( async (req,res) => {
    const user = await User.findOne({email : req.body.email})
    if (!user) {
        return res.status(404).json({message : "User Not Found"})
    }
    const secret = process.env.JWT_SECRET_KEY + user.password
    const token = jwt.sign({email : user.email, id : user.id} , secret , {expiresIn : '10m'})
    const link =  `http://localhost:4000/password/reset-password/${user._id}/${token}`

    res.json({mesage : 'Click on the Link', resetPasswordLink: link})
})

module.exports = {
    getForgotPasswordView,
    sendForgotPasswordLink,
}