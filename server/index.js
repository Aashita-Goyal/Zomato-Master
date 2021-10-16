//Importing Env variables
require ("dotenv").config();

//Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

//configs
import googleAuthConfig from "./config/google.config.js";
import routeConfig from "./config/route.config.js";

//Microservices routes
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant/index.js";
import Food from "./API/Food/index.js";
import Menu from "./API/Menu/index.js";
import Image from "./API/Image/index.js";
import Order from "./API/Orders";
import Reviews from "./API/Reviews";
import User from "./API/User";
import MailService from "./API/Mail";
import Payments from "./API/Payments";

//Database connection
import ConnectDB from "./database/connection.js"



const zomato = express();

console.log(process.env);

//application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport configuration
googleAuthConfig(passport);
routeConfig(passport);

//Application Routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/reviews", Reviews);
zomato.use("/user", User);
zomato.use("/mail", MailService);
zomato.use("/payments", Payments);



zomato.get("/", (req,res) => res.json({ message: "Setup success"}));

//console.log(process.env.GOOGLE_CLIENT_ID) ;
const port = process.env.PORT || 3000;

zomato.listen(3000, () => 
ConnectDB()
  .then(() => console.log("Server is Running! 😍✨\n"))
   .catch(() => console.log("Server is running, but database connection failed...\n"))
);