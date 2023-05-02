const express = require("express");
require("dotenv").config();

const { connection } = require("./config/db");
const { userRoute } = require("./routes/user.route");
const { postRoute } = require("./routes/post.route");

const app = express();
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", postRoute);

app.get("/", (req,res)=>{
    res.send("Welcome to Social Media App");
})

app.listen(process.env.port, async (req,res)=>{
    try {
        await connection;
        console.log("DB connection");
    } catch (err) {
        console.log("DB not connected");
    }
    console.log(`Server is running on port ${process.env.port}`);
})