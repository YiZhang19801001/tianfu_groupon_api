import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, role: role, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = JSON.parse(
        localStorage.getItem("tianfu_groupon_user")
      );
      if (!currentUser) {
        return (
          <Redirect
            to={{
              pathname: `${process.env.PUBLIC_URL}/`,
              state: { from: props.location }
            }}
          />
        );
      } else if (!currentUser[role]) {
        return (
          <Redirect
            to={{
              pathname: `${process.env.PUBLIC_URL}/reject`,
              state: { from: props.location }
            }}
          />
        );
      }
      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
