import AWS from "aws-sdk";

//AWS s3 bucket config
const s3Bucket = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: "ap-south-1",
    //config: process.env.AWS_SDK_LOAD_CONFIG,
});

//function that will upload the above for aws server

export const s3Upload = (options) => {
    return new Promise((resolve, reject) => 
       s3Bucket.upload(options, (error, data) => {
           if(error) return reject(error);
           return resolve(data);
           //resolve = success, reject = error
       })
    );
};