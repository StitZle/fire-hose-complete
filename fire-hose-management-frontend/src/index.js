import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {ThemeProvider} from "@material-ui/styles";
import {createBrowserHistory} from "history";

import {Auth0Provider} from "@auth0/auth0-react";
import configJson from "./auth_config.json";
import theme from "./theme";
import {AppRouter} from "./router/AppRouter";

const queryClient = new QueryClient( {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            cacheTime: 0,
            retryDelay: attemptIndex => Math.min( 1000 * 2 ** attemptIndex, 30000 ),
        },
        mutations: {
            retry: false,
        }
    }
} )

export const history = createBrowserHistory( {
    basename: process.env.PUBLIC_URL
} )

const providerConfig = {
    domain: configJson.domain,
    clientId: configJson.clientId,
    audience: configJson.audience,
    redirectUri: window.location.origin,
    cacheLocation: "localstorage"
}

const app = (<Auth0Provider {...providerConfig}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter exact path={"/"}>
                    <ThemeProvider theme={theme}>
                        <ToastContainer/>
                        <AppRouter/>
                    </ThemeProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </Auth0Provider>
)

ReactDOM.render( app, document.getElementById( 'root' ) );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
