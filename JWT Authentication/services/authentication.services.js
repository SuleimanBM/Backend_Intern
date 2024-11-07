const userModel = require("../models/user.model");

// Class handling user authentication-related services
class AuthenticationServices {
    // Store user data in the database
    static async storeUserData(email, password) {
        const user = await new userModel({ email, password });
        return user.save();
    }

    // Login a user by checking email and password
    static async LoginUser(email, password) {
        const user = await userModel.findOne({ email });
        console.log(user);
        // Check if the password matches the stored password
        const isMatch = await user.checkPassword(password, user.password);
        return { user, isMatch };
    }

    // Check if a user exists by ID
    static async CheckUser(id) {
        const user = await userModel.findById(id);
        return user;
    }

    // Find a user by their email
    static async FindUser(field) {
        const user = await userModel.findOne({ email: field });
        console.log(`Found user: ${user}`);
        return user;
    }

    // Update a user's password
    static async updatePassword(id, password) {
        const user = await userModel.findById(id);
        user.password = password;
        return user.save();
    }

    // Update a user's verification status to "Verified"
    static async updateVerification(id) {
        try {
            const user = await userModel.findById(id);
            console.log(user);
            user.verification = "Verified";
            return user.save();
        } catch (error) {
            console.log(error);
        }
    }

    // Check if a user's password has changed since the JWT was issued
    static async isPasswordChange(id, iat) {
        const user = await userModel.findById(id);
        const passwordchange = await user.isPasswordChange(iat);
        return passwordchange;
    }
}

module.exports = AuthenticationServices;
