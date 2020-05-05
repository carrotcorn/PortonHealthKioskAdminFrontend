import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../Contexts";

export default function PrivateRoute({ children, ...rest }) {
  const userContext = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={() =>
        userContext.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}
