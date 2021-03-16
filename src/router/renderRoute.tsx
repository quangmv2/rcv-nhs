import { Switch, Route, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PublicLayout from "./public";
import PrivateLayout from "./private";
import { routerAuth, routerNoAuth } from "./routers";
import * as _ from "lodash";

const RenderRouter = () => {
    // const [isPublicRoute, setIsPublicRoute,] = useState<boolean>(true);
    // const location = useLocation()

    // useEffect(() => {
    //     setIsPublicRoute(isPublic(location.pathname))
        
    // }, [location.pathname])

    // const isPublic = (pathName: string) => {
    //     const is = routerNoAuth.some(r => r.path == pathName || r.path.startsWith('/home'));
    //     console.log(is);
    //     return is;
    // }
    return (
        <Switch>
            {/* <> */}
            {
                // isPublicRoute ?
                //     <PublicLayout>
                //         {
                //             routerNoAuth.map(route => {
                //                 return <Route path={route.path} key={route.path} exact={route.exact} component={route.component} />
                //             })
                //         }
                //         {/* </Switch> */}
                //     </PublicLayout> :
                //     <PrivateLayout>
                //         {/* <Switch> */}
                //         {
                //             routerAuth.map(route => {
                //                 return <Route path={route.path} key={route.path} exact={route.exact} component={route.component} />
                //             })
                //         }
                //     </PrivateLayout>
            }

            {
                _.concat(routerNoAuth, routerAuth).map((route, index) => {
                    if (route.isAuth) return (
                        <Route path={route.path} exact={route.exact} key={`${route.path} ${index}`} 
                            render={() =>{
                                return <PrivateLayout MyComponent={route.component} />
                            }}
                        />
                    )
                    return (
                        <Route path={route.path} exact={route.exact} key={`${route.path} ${index}`} 
                            render={() =>{
                                return <PublicLayout MyComponent={route.component} />
                            }}
                        />
                    )
                })
            }

        </Switch>
        // </>
    )
}

export default RenderRouter