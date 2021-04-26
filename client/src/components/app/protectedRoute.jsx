import React from "react";
import { Route, Redirect } from "react-router-dom";
import useToken from "./userToken";


export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
    const {token, setToken} = useToken();
  return (
    <Route
      {...rest}
      render={props => {
        if (token) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
