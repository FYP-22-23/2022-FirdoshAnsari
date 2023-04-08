import {useEffect} from "react";

// react-router components
import {Redirect, Route, Switch, useLocation} from "react-router-dom";

// @mui material components
import {StyledEngineProvider, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";
// Soft UI Dashboard PRO React components
// import SuiBox from "components/SuiBox";
// Soft UI Dashboard PRO React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

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

    // const configsButton = (
    //   <SuiBox
    //     display="flex"
    //     justifyContent="center"
    //     alignItems="center"
    //     width="3.5rem"
    //     height="3.5rem"
    //     backgroundColor="white"
    //     boxShadow="sm"
    //     borderRadius="50%"
    //     position="fixed"
    //     right="2rem"
    //     bottom="2rem"
    //     zIndex={99}
    //     customClass="cursor-pointer"
    //     onClick={handleConfiguratorOpen}
    //   >
    //     <Icon className=" text-dark" fontSize="default">
    //       settings
    //     </Icon>
    //   </SuiBox>
    // );

    const {user} = useAuth()
    const isAdmin = user === null ? false : user.is_admin

    return (
        <>
            <ToastContainer/>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    {layout === "dashboard" && (
                        <>
                            <Sidenav routes={routes(isAdmin)}/>
                            <Configurator/>
                            {/* {configsButton} */}
                        </>
                    )}
                    {layout === "vr" && <Configurator/>}
                    <Switch>
                        {getRoutes(routes(isAdmin))}
                        <Redirect from="*" to="/dashboard"/>
                    </Switch>
                </ThemeProvider>
            </StyledEngineProvider>
        </>
    )

}