//Libraries
import express from "express";
import passport from "passport";
import multer from "multer";

//Database modal
import { ImageModel } from "../../database/allModels.js";

//Validation
//import { ValidateImageUpload } from "../../validation/image.js";

//Utilities
import { s3Upload } from "../../Utils/AWS/s3.js";

const Router = express.Router();

//Multer Config
const storage = multer.memoryStorage();
const upload = multer({ storage });





/*
Route     /image
Des       uploads given image to S3 bucket, and saves filelink to mongoDb
Params    none
Access    Public
Method    POST
*/
Router.post("/", upload.single("file"), async (req,res) => {
    try{
        await ValidateImageUpload(req.file);


        //upload to s3
        const file = req.file;

        //s3 bucket options
        const bucketOptions = {
            Bucket: "zomatoprojectaashita",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read", //Access control List
        };
        

        const uploadImage = await s3Upload(bucketOptions);

        return res.status(200).json({ uploadImage });


    } catch (error){
        return res.status(500).json({ error: error.message });
    }
});


export default Router;