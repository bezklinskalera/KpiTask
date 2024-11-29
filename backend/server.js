import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Account from './models/account.model.js';

dotenv.config();

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const account = req.body;

    if(!account.userName || !account.email || !account.password) {
        return res.status(400).json({ success:false, message: "Please provide all fields"});
    }

    const newAccount = new Account(account)

    try{
        await newAccount.save();
        res.status(201).json({ success: true, data: newAccount})
    }catch (error){
       console.error("Error in Create account:", error.message);
       res.status(500).json({success: false, message: "Server Error"});
    }
});



app.get("/", (req,res) => {
    res.send("Server is ready");
})

app.listen(8086, () => {
    connectDB();
    console.log("Server started");
});