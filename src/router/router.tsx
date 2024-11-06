import React from "react";
import { Navigate, RouteObject } from "react-router-dom";

const HomePage = React.lazy(()=> import(/* webpackChunkName: "HomePage"  */ "../pages/HomePage/HomePage"))

const routes: Array<RouteObject> = [
    {
        path: "/homepage",
        element: <HomePage />
    },
    {
        path: "/",
        element: <Navigate to="/homepage" />
    },
]


export default routes