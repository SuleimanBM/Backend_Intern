require('dotenv').config();
const app = require("./app");
const db = require("./config/db");

const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`)
})
