import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, requred: true },
    address: { type: String, requred: true },
    mapLocation: { type: String, required: true },
    cuisine: [String],
    restaurantTimings: String,
    contactNumber: Number,
    website: Number,
    popularDishes: [String],
    averageCost: Number,
    amenities: [String],
    menuImages: {
        type: mongoose.Types.ObjectId,
        ref: "Images", 
    },
    menu: {
        type: mongoose.Types.ObjectId,
        ref: "Menus", 
    },

    reviews: [{ type: mongoose.Types.ObjectId, ref: "Reviews" }],
    photos: { type: mongoose.Types.ObjectId, ref: "Images" },
});

export const RestautrantModel = mongoose.model("Restaurants", RestaurantSchema);