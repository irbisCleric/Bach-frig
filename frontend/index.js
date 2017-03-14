import { Router } from "react-router";
// import { syncHistoryWithStore } from "react-router-redux";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";


// Needed for onTouchTap for Material Design
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import routes from "./config/appRoutes";
import configureStore from "./store/root.store";
import appHistory from "./config/appHistory";

const initialState = {};
const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
         <Router children={routes} history={appHistory} />
    </Provider>, 
    document.getElementById("root"),
);
