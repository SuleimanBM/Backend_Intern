const AuthenticationServices  = require("../services/authentication.services");
const EmailServices = require("../services/emailService");
const path = require('path');


const jwt = require('jsonwebtoken');
const util = require('util')


const genToken = (id, email)=>{
    return jwt.sign(
        { id: id, email: email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.SESSION_EXPIRES }
    );
}

//function to sign up
exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await AuthenticationServices.storeUserData(email, password);

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Error creating account"
            })
        }
        const token = genToken(user._id, user.email);
        const link = `http://localhost:3000/auth/verify_email?token=${token}`
        const message = `Please click on the link ${link} to verify your email\n\n\n Please ignore this email if you did not initiate this process`
        EmailServices.sendEmail(email, message)
        return res.status(200).json({
            message: 'Account created successfully',
            token: token,
        });
    }catch(error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const user = await AuthenticationServices.LoginUser(email, password);
    console.log(user)
    if (!user.isMatch) {
        return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const token = genToken(user.user._id, user.user.email);
    return res.status(200).json({
        message: 'Login successful',
        token: token,
        
    });
}
exports.protect = async (req, res, next) => {
    try{
    const checktoken = req.headers.authorization
    console.log(checktoken)
    let token;
    if(checktoken && checktoken.startsWith("bearer")) {
        token = checktoken.split(" ")[1]
    }
    if(!token){
       return res.json({message: "Login to view cartItems", error})
    }
   
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET)
    //console.log(decodedToken)

    const id = decodedToken.id
    console.log(id)
    const userExist = await AuthenticationServices.CheckUser(id)
    if(!userExist){
        return res.status(401).json({ message: "User does not exist" });
    }
    console.log(userExist )

    const isPasswordChange = await AuthenticationServices.isPasswordChange(id,decodedToken.iat)
    if(isPasswordChange === true){
        return res.status(400).json({ message: "Password changed recently. Please login again." });
    }
    req.user = userExist
     next()
    }catch(error){
        console.error("Token verification failed:", error);
        return res.status(401).json({ message: "Invalid or expired token, please log in again" });
    }
}
exports.verifyMail = async (req, res) => {
    try {
        
    const  { token } = req.query;
    if(!token){
       return res.json({message: "Invalid token", error})
    }
   
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET)
    //console.log(decodedToken)

    const id = decodedToken.id

    //console.log(id)

    const userExist = await AuthenticationServices.CheckUser(id)
    if(!userExist){
        return res.status(401).json({ message: "User does not exist" });
    }

    await AuthenticationServices.updateVerification(id)
  
    res.status(200).json({message: "Email verified successfully"})
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}
exports.forgotPassword = async (req, res) => {
    try{
        const { email } = req.body;
        console.log(email)
        const user = await AuthenticationServices.FindUser(email)
        if(!user){
            return res.status(401).json({ message: "User does not exist" });
        }
        console.log(user)
        const token = genToken(user._id, user.email);
        const link = `http://localhost:3000/auth/reset_password?token=${token}`
        const message = `Click on the link to reset your password: ${link}`
        EmailServices.sendEmail(email, message)
        res.status(200).json({message: "Email sent successfully"})
    }catch(error){
        res.status(500).json({message: "Internal server error", error})
    }
}

exports.sendResetPage = async (req, res) => {
    try{
    res.sendFile(path.join(__dirname, '../utils', 'resetPage.html'));

    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
}

exports.changePassword = async (req, res) => {
    try{
        const { token, newPassword } = req.body
        
        const decodedToken = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET)

        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decodedToken.exp < currentTime) {
            return res.status(400).json({ message: "Token has expired. Please request a new reset link." });
        }
        const id = decodedToken.id
        const user = await AuthenticationServices.CheckUser(id)

        if(!user){
            return res.status(401).json({ message: "User does not exist" });
        }

          // 4. Update the user's password securely
        const updatedUser = await AuthenticationServices.updatePassword(id, newPassword)
        console.log(updatedUser)
        return res.status(200).json({ message: "Password reset successful!" });
    }catch(error){
        return res.status(400).json({ message: "Password reset unsuccessful!" });
    }
}