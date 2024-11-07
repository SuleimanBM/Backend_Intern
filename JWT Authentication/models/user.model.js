const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

/**
 * This is the schema for the user model in the database.
 * It contains the email, password and verification status of each user.
 */
const userSchema = new mongoose.Schema({
    /**
     * The email address of the user.
     */
    email: { 
        type: String, 
        required: true 
    },
    /**
     * The password of the user, which is hashed using bcrypt.
     */
    password: { 
        type: String, 
        required: true 
    },
    /**
     * The verification status of the user, which can be either "Verified" or "Not verified".
     */
    verification: { 
        type: String, 
        enum:["Verified", "Not verified"], 
        default: "Not verified" 
    }
});

/**
 * This is a pre-save hook that hashes the password of the user before it is saved in the database.
 * It is called before the user is saved in the database, and it modifies the user object passed to it.
 */
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    /**
     * Hash the password using bcrypt, with a salt of 16.
     */
    this.password = await bcrypt.hash(this.password, 16)
});

/**
 * This is an instance method of the user model that checks if a given password matches the password in the database.
 * It takes two arguments, the password from the database and the password given by the user.
 * It returns a boolean indicating whether the passwords match.
 */
userSchema.methods.checkPassword = async function (passwordDb, passwordUser) {
    return await bcrypt.compare(passwordDb, passwordUser)
};

/**
 * This is an instance method of the user model that checks if the user has changed their password recently.
 * It takes one argument, the timestamp of the JWT token that was used to authenticate the user.
 * It returns a boolean indicating whether the user has changed their password since the given timestamp.
 */
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
};

/**
 * This is the model for the user collection in the database.
 */
const userModel = db.model('User', userSchema);

module.exports = userModel;
