import { Switch, Route, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PublicLayout from "./public";
import PrivateLayout from "./private";
import { routerAuth, routerNoAuth } from "./routers";

const RenderRouter = () => {
    const [isPublicRoute, setIsPublicRoute,] = useState<boolean>(true);
    const location = useLocation()

    useEffect(() => {
        setIsPublicRoute(isPublic(location.pathname))
        
    }, [location.pathname])

    const isPublic = (pathName: string) => {
        return routerNoAuth.some(r => r.path == pathName);
    }
    return (
        <Switch>
            {/* <> */}
            {
                isPublicRoute ?
                    <PublicLayout>
                        {
                            routerNoAuth.map(route => {
                                return <Route path={route.path} key={route.path} exact={route.exact} component={route.component} />
                            })
                        }
                        {/* </Switch> */}
                    </PublicLayout> :
                    <PrivateLayout>
                        {/* <Switch> */}
                        {
                            routerAuth.map(route => {
                                return <Route path={route.path} key={route.path} exact={route.exact} component={route.component} />
                            })
                        }
                    </PrivateLayout>
            }
        </Switch>
        // </>
    )
}

export default RenderRouter