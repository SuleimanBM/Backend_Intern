const userModel = require("../models/user.model")

class AuthenticationServices {
    static async storeUserData(email, password) {
        const user = await new userModel({ email, password })
        return user.save()
    }

    static async LoginUser(email, password, ) {
       const user = await userModel.findOne({email})
       console.log(user)
        // if (!user) {
        //     return { error: 'User not found', isMatch: false };
        // }
       const isMatch = await user.checkPassword(password, user.password);
       return { user, isMatch };
    }

     static async CheckUser(id) {
        const user = await userModel.findById(id)
        return user
    }

    static async FindUser(field){
        const user = await userModel.findOne({email: field})
        console.log(`Found user: ${user}`)
        return user
    }

    static async updatePassword(id, password){
        const user = await userModel.findById(id)
        user.password = password
        return user.save()
    }
    static async updateVerification(id){
        try{
        const user = await userModel.findById(id)
        console.log(user)
        user.verification = "Verified"
        return user.save()
        }catch(error){
            console.log(error)
        }
    }
    static async isPasswordChange(id,iat) {
        const user = await userModel.findById(id)
        const passwordchange = await user.isPasswordChange(iat)
        return passwordchange
    }

}

module.exports = AuthenticationServices