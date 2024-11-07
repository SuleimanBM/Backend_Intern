const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    verification: { 
        type: String, 
        enum:["Verified", "Not verified"], 
        default: "Not verified" 
    },
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 16)
})

userSchema.methods.checkPassword = async function (passwordDb, passwordUser) {
    return await bcrypt.compare(passwordDb, passwordUser)
}


userSchema.methods.isPasswordChange = async function(JWTtimestamp) {
    if(this.passwordChangedAt){
        const timestamp = parseInt(this .passwordChangedAt.getTime()/1000, 10)
        console.log(timestamp)
        if(timestamp > JWTtimestamp){
            return true
        }
        //console.log(this.passwordChangedAt, JWTtimestamp)
    }
    //console.log(this.passwordChangedAt, JWTtimestamp)
    return false
}

const userModel = db.model('User', userSchema);

module.exports = userModel;