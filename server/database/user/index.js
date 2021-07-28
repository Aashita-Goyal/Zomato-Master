import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
    fullname: { type: String, requires: true},
    email : { type: String, required: true },
    password: { type: String },
    address: [{ detail: { type: String, for: { type: String }}}],
    phoneNumber: [{ type: Number }],
    },
    {
        timestamps: true,   //createdAt, updatedAt
    }
);

UserSchema.methods.generateJwtTokens = function() {
    const token = jwt.sign({ user: this._id.toString() }, "ZomatoAPP" );
};


UserSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
    const checkUserByEmail = await UserModel.findOne({ email });
        const checkUserByPhone = await UserModel.findOne({ phoneNumber });

        if (checkUserByEmail || checkUserByPhone) {
            throw new Error("User already exists!"); 
        }

        return false;
};

UserSchema.pre("save", function (next) {
    const user = this;

    //password is modified
    if(user.isModified("password")) return next();

    //generate bcrypt salt
    bcrypt.genSalt(8, (error, salt) => {
        if(error) return next(error);

        //if no error, we hash the password
        bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error);

        //assigning hashed password   
        user.password = hash;
        return next();
        });
    });
});  //we can use this while saving or creating new data
        


export const UserModel = mongoose.model("Users", UserSchema);