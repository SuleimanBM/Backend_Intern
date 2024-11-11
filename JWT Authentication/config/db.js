const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB Atlas!");
})
.catch((error) => {
    console.error("Database connection error:", error);
});

module.exports = mongoose;
