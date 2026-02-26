const express = require("express");
const dotenv= require("dotenv");
const cors = require("cors");
const connectDB = require("./src/db/db");
dotenv.config();

let app = express();

app.use(cors());
app.use(express.json())

// connection database 
connectDB()
.then(()=>console.log("database conected"))
.catch((err)=>console.log(err));


// api routes setup 
// app.use("/api/v1",)

module.exports =app;