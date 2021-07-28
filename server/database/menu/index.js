import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
{
    menus: [
        {
            name: { type: String, requires: true },
            items: [{
                type: mongoose.Types.ObjectId,
                ref: "Foods",
            },
          ],
        },
    ],
    recommended: [{
        type: mongoose.Types.ObjectId,
        ref: "Foods",
        unique: true,
    },
 ],
},
{
    timestamps: true,   //createdAt, updatedAt
}
);

export const MenuModel = mongoose.model("Menu", MenuSchema);