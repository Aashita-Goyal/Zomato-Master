//Libraries
import express from "express";
import passport from "passport";

//Database modal
import { RestautrantModel } from "../../database/allModels.js";

//validation
import { ValidateRestaurantCity, ValidateRestaurantSearchString } from "../../validation/restaurant.js"
import { ValidateRestaurantId } from "../../validation/food.js";

const Router = express.Router();

/*
Route     /
Des       get all the restaurant details based in city
Params    none
Access    Public
Method    GET
*/
Router.get("/", async (req,res) => {
    try{
        await ValidateRestaurantCity(req.query);

        const { city } = req.query;
        const restaurants = await RestautrantModel.find({ city });

        return res.json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


/*
Route     /
Des       get individual restaurant based on id
Params    _id
Access    Public
Method    GET
*/
Router.get("/:_id", async (req,res) => {
    try{
        await ValidateRestaurantId(req.params);

        const { _id } = req.params;
        const restaurant = await RestautrantModel.findOne(_id);
        if(!restaurant) 
          return res.status(404).json({ error: "Restaurant not found!" });
        return res.json({ restaurant });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


/*
Route     /search
Des       get restaurant details based on search string
Params    none
Body      searchString
Access    Public
Method    GET
*/
Router.get("/search", async (req,res) => {
    try{
        await ValidateRestaurantSearchString(req.body);

        const { searchString } = req.body;
        const  restaurants = await RestautrantModel.find({ 
            name: { $regex: searchString, $options: "i" },
        });

        if(!restaurant) 
          return res.status(404).json({ error: `No Restaurant matched with  ${searchString}` });

        return res.json({ restaurant });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});



export default Router;