//Library 
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Models
import { UserModel } from "../../database/user/index.js";




const Router = express.Router();

/* 
Route    
Des      
Params   
Access   public
Method   
*/
Router.post("/signup", async (req,res) => {
    try {
        const { email, password, fullname, phoneNumber } = req.body.credentials;
        //1. check whether email exists
        const checkUserByEmail = await UserModel.findOne({ email });
        const checkUserByPhone = await UserModel.findOne({ phoneNumber });

        if (checkUserByEmail || checkUserByPhone) {
            return res.json({ error: "User already exists!" });
        }

            //1a. hash the password
            const bcryptSalt = await bcrypt.genSalt(8);

            const hashedPassword = await bcrypt.hash(password, bcryptSalt);

            //1b. save to database (db)
            await UserModel.create({ 
                ...req.body.credentials, 
                password: hashedPassword,
            });

        //2. generate JWT auth token
        const token = jwt.sign({ user: { fullname, email } }, "ZomatoAPP" );

        //3. return
        return res.status(200).json({ token, status: "success" });

    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;











/* 
Route    
Des      
Params   
Access   public
Method   
*/
/*
Router.post("/", async (req,res) => {
    try {
        const 
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
*/
