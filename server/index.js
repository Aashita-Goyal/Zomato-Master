//Importing Env variables
require ("dotenv").config();

//Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";

//Microservices routes
import Auth from "./API/Auth";

//Database connection
import ConnectDB from "./database/connection.js"



const zomato = express();

//application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({extended: false }));
zomato.use(helmet());
zomato.use(cors());

//Application Routes
zomato.use("/auth", Auth);



zomato.get("/", (req,res) => res.json({ message: "Setup success"}));

zomato.listen(4000, () => 
ConnectDB()
  .then(() => console.log("Server is Running! 😍✨\n"))
   .catch(() => console.log("Server is running, but database connection failed...\n"))
);