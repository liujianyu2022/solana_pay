import React, { Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const HomePage = React.lazy(()=> import(/* webpackChunkName: "HomePage"  */ "../pages/HomePage/HomePage"))
const Checkout = React.lazy(()=> import(/* webpackChunkName: "Checkout"  */ "../pages/Checkout/Checkout"))
const Confirmed = React.lazy(()=> import(/* webpackChunkName: "Confirmed"  */ "../pages/Confirmed/Confirmed"))

const routes: Array<RouteObject> = [
    {
        path: "/homepage",
        element: <Suspense><HomePage /></Suspense>
    },
    {
        path: "/checkout",
        element: <Suspense><Checkout /></Suspense> 
    },
    {
        path: "/confirmed",
        element: <Suspense><Confirmed /></Suspense> 
    },
    {
        path: "/",
        element: <Navigate to="/homepage" />
    },
]


export default routes