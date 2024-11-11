const express = require("express")
const bodyParser = require("body-parser")
const path = require('path');


const authenticateRoute = require("./routes/authenticationRoute")
const protectedRoute = require("./routes/protectedRoute")

const app  = express()
app.use(express.static('./utils'));

app.use(bodyParser.json())

//routes
app.use("/auth", authenticateRoute)
app.use("/protected", protectedRoute)

module.exports = app