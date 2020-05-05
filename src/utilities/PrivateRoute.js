import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../Contexts";
import PageNotFound from "../components/PageNotFound";

export default function PrivateRoute({ children, roles, ...rest }) {
  const userContext = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={() => {
        if (!userContext.user) {
          return (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          );
        } else if (!roles) {
          return children;
        } else {
          for (let role of roles) {
            if (userContext.user.roles.includes(role)) {
              return children;
            }
          }
          return <PageNotFound />;
        }
      }}
    />
  );
}
