import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
{
    images: [
        {
            location: { type: String, required: true },
        },
    ],
},
{
    timestamps: true,   //createdAt, updatedAt
}
);


export const ImageModel = mongoose.model("Images", ImageSchema);