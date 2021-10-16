//Libraries
import express from "express";
import passport from "passport";

//Database modal
import { MenuModel } from "../../database/allModels.js";

//validation
import { ValidateMenuID, ValidateMenuImages } from "../../validation/menu.js";

const Router = express.Router();

/*
Route     /list
Des       Get all menu based on id
Params    _id
Access    Public
Method    GET
*/
Router.get("/list/:_id", async (req,res) => {
    try{
        await ValidateMenuID(req.params);

        const { _id } = req.params;
        const menus = await MenuModel.findOne(_id);

        return res.json({ menus });
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
});


/*
Route     /image
Des       Get menu image based on id
Params    _id
Access    Public
Method    GET
*/
Router.get("/image/:_id", async (req,res) => {
    try{
        await ValidateMenuImages(req.params);

        const { _id } = req.params;
        const menus = await MenuModel.findOne(_id);

        return res.json({ menus });
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
});


/*
Route     /new
Des       Add new menu
Params    none
BODY      review object
Access    Public
Method    POST  
*/
Router.post("/new", async (req, res) => {
    try {
  
      const { reviewData } = req.body;
  
      await ReviewModel.create(reviewData);
  
      return res.json({ review: "Sucessfully Created Review." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

export default Router;