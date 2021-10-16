import { combineReducers } from "redux";

import restaurant from "./Restaurant/Restaurant.reducer";
import image from "./Image/Image.reducer";
import reviews from "./Reviews/Reviews.reducer";
import user from "./User/User.reducer";
import food from "./Food/Food.reducer";
import cart from "./Cart/Cart.reducer";
import order from "./Order/Order.reducer";

const rootReducer = combineReducers({
  restaurant,
  image,
  reviews,
  user,
  food,
  cart,
  order,
});

export default rootReducer;