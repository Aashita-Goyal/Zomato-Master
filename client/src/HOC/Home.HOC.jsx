import React from "react";
import { Route } from "react-router-dom";

// Layout
import HomeLayout from "../Layout/Home.layout.jsx";

const HomeLayoutHOC = ({ component: Component, ...rest }) => {
  return (
    <>
      <Route
        {...rest}
        component={(props) => (
          <HomeLayout>
            <Component {...props} />
          </HomeLayout>
        )}
      />
    </>
  );
};

export default HomeLayoutHOC;