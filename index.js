const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/db');
const app = express();
const dotenv = require("dotenv").config();

connectDb();
app.use(express.json());
const port = process.env.PORT ||  5000;
app.use("/api/contacts" ,require("./Routes/contactRoute"));
app.use("/api/users" , require("./Routes/userRoutes"));
app.use(errorHandler)

// app.get("/api/contacts" , (req,res)=>{
//     // res.send("HELLO HOMIEEE");
//     // res.json({message : "HELLOWWWIEEEE"})
//     res.status(200).json({message: " YOOWWWWIEEE"})
// })

app.listen(port , ()=>{
    console.log(`server is running on ${port}`);
})