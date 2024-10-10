const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;


const Accounts = []

//Creating an account (POST)
app.post("/authenticate", (req, res) => {
    const { username ,password} = req.body
    if(!username || !password) {
        return res.status(400).json({message: "Invalid credentials for creating account"})
    }
    Accounts.forEach(account => {
        if(account.username == username) {
            return res.json({message: "User already exists"})
        }
    })
    const newAccount = {
        id: Accounts.length + 1,
        username: username,
        password: password,
        signedIn: false,
    }
    Accounts.push(newAccount)
    res.status(201).json({message: "Account created successfully",Account: newAccount})
})

app.get("/authenticate/", (req, res)=> {
    const user = Accounts.find( user => user.username === req.body.username)

    if(!user) {
        return res.status(404).json({message: "Invalid username"})
    }
    if(user.password !== req.body.password) {
        return res.status(404).json({message: "Invalid password"})
    }

    user.signedIn = true
    res.status(200).json({message: "Sign In sucessful",User: user})


})

app.patch("/authenticate/", (req, res)=> {
    const user = Accounts.find( user => user.username === req.body.username)

    if(!user) {
        return res.status(404).json({message: "Invalid username"})
    }
    if(user.password !== req.body.password) {
        return res.status(404).json({message: "Current password Incorrect"})
    }

    user.password = req.body.newPassword
    res.status(200).json({message: "Password changed successful", newPassword: user.password})
})

app.delete("/authenticate/", (req, res)=> {
    const user = Accounts.find( user => user.username === req.body.username)

    if(!user) {
        return res.status(404).json({message: "Invalid username"})
    }
    if(user.password !== req.body.password) {
        return res.status(404).json({message: "Current password Incorrect"})
    }
    Accounts.splice(user.id,1)
    res.status(200).json({message:"Account deleted sucessfully"})
})

app.listen(port, () => {
    console.log("server running")
})