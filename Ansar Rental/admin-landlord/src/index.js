import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "App";

// Soft UI Dashboard React Context Provider
import {SoftUIControllerProvider} from "context";

import {AuthProvider} from "auth-context/auth.context";
import {ApiProvider} from "./api-context/api.context";
import {QueryClient, QueryClientProvider} from "react-query";

let user = localStorage.getItem("user");
user = JSON.parse(user);

const queryClient = new QueryClient()

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider userData={user}>
            <ApiProvider>
                <BrowserRouter>
                    <SoftUIControllerProvider>
                        <App/>
                    </SoftUIControllerProvider>
                </BrowserRouter>
            </ApiProvider>
        </AuthProvider>
    </QueryClientProvider>,
    document.getElementById("root")
);
