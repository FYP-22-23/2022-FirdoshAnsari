import {useEffect} from "react";

// react-router components
import {Redirect, Route, Switch, useLocation} from "react-router-dom";

// @mui material components
import {StyledEngineProvider, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "examples/Sidenav";

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";

// Soft UI Dashboard PRO React routes
import routes from "routes";

// Soft UI Dashboard PRO React contexts
import {useSoftUIController} from "context";

import {ProtectedRoute} from "./ProtectedRoute";
import {useAuth} from "auth-context/auth.context";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
    const [controller] = useSoftUIController();
    const {direction, layout} = controller;
    const {pathname} = useLocation();

    // const handleConfiguratorOpen = () => {
    //   dispatch({ type: "OPEN_CONFIGURATOR", value: !openConfigurator });
    // };

    // Setting the dir attribute for the body element
    useEffect(() => {
        document.body.setAttribute("dir", direction);
    }, [direction]);

    // Setting page scroll to 0 when changing the route
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [pathname]);

    const getRoutes = (allRoutes) => {
        return allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }

            if (route.route) {
                if (route.protected) {
                    return <ProtectedRoute path={route.route} component={route.component} key={route.key}/>;
                }
                return <Route exact path={route.route} component={route.component} key={route.key}/>;
            }

            return null;
        })
    };

    const {user} = useAuth()
    const isAdmin = user === null ? false : user.is_admin

    return (
        <div>
            <ToastContainer/>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    {user !== null && (
                        <>
                            <Sidenav routes={routes(isAdmin)}/>
                        </>
                    )}
                    <Switch>
                        {getRoutes(routes(isAdmin))}
                        <Redirect from="*" to={isAdmin ? "/landlords" : "/dashboard"}/>
                    </Switch>
                </ThemeProvider>
            </StyledEngineProvider>
        </div>
    )

}