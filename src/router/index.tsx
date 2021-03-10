import React, { Suspense, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    useLocation
} from "react-router-dom";
import Public from "./public";
import Private from "./private";
import { routerAuth, routerNoAuth } from "./routers";
import RouterContainer from "./renderRoute";


const RouterRoot = () => {

    

    return (
        <Router>
            <Suspense fallback={"Loading..."}>
                <RouterContainer />

            </Suspense>
        </Router >
    )
}
export {
    RouterRoot
}