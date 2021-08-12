//Library 
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

//Models
import { UserModel } from "../../database/user/index.js";




const Router = express.Router();

/*   
Route    /signup
Des      Signup with email and password
Params   none
Access   public
Method   POST
*/
Router.post("/signup", async (req,res) => {
    try {
       /* const { email, password, fullname, phoneNumber } = req.body.credentials; */
        //1. check whether email exists
        /*const checkUserByEmail = await UserModel.findOne({ email });
        const checkUserByPhone = await UserModel.findOne({ phoneNumber });

        if (checkUserByEmail || checkUserByPhone) {
            return res.json({ error: "User already exists!" });
        }*/
        /*await UserModel.findByEmailAndPhone(email, phoneNumber);*/
        await UserModel.findByEmailAndPhone(req.body.credentials);

            //1a. hash the password
            /* const bcryptSalt = await bcrypt.genSalt(8);

            const hashedPassword = await bcrypt.hash(password, bcryptSalt); */

            //1b. save to database (db)
            /*await UserModel.create(req.body.credentials);*/
            const newUser = await UserModel.create(req.body.credentials);

        //2. generate JWT auth token
          /*const token = jwt.sign({ user: { fullname, email } }, "ZomatoAPP" );*/
          const token = newUser.generateJwtTokens();

        //3. return
        return res.status(200).json({ token, status: "success" });

    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


/* 
Route    /signin
Des      signin with email and pasword
Params   none
Access   public
Method   POST
*/
Router.post("/signin", async (req,res) => {
    try {
        const user = await UserModel.findByEmailAndPassword(
            req.body.credentials
        );

        const token = user.generateJwtToken();
        return res.status(200).json({ token, status: "success" });
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


/*
Route     /google
Des       Google Signin
Params    none
Access    Public
Method    GET  
*/
Router.get("/google", passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    })
  );
  

  /*
  Route     /google/callback
  Des       Google Signin Callback
  Params    none
  Access    Public
  Method    GET  
  */
  /* Router.get("/google/callback", passport.authenticate(
      'google', { failureRedirect: "/" }),
    (req, res) => {
      return res.json({ token: req.session.passport.user.token });
    }
  ); */
  Router.get("/google/callback", passport.authenticate(
    'google'),
    (err, req, res, next) => { // custom error handler to catch any errors, such as TokenError
        if (err.name === 'TokenError') {
         res.redirect('/auth/google'); // redirect them back to the login page
        } else {
         // Handle other errors here
        }
      },
      (req, res) => {
        return res.json({ token: req.session.passport.user.token });
      }
);




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
        return res.status(200).json({ token, status: "success" });
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
*/
