import { Route , Redirect } from "react-router-dom";
import React from "react";

const isAuthenticated = () =>{
    return localStorage.getItem("token") ? true : false;
}

export default function PrivateRoute({children, ...rest}) {

    return(
        <Route
        {...rest}
        render={({ location }) =>
        isAuthenticated() ? (
            children
        ) : (
            <Redirect to={{
                pathname: "/login",
                state: { from: location }
            }}
            />
        )
        }
    />
    );
}