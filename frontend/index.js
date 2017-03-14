import { Router } from "react-router";
// import { syncHistoryWithStore } from "react-router-redux";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";

import routes from "./config/appRoutes";
import configureStore from "./store/root.store";
import appHistory from "./config/appHistory";

// Needed for onTouchTap for Material Design
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const initialState = {};
const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Router history={appHistory} >
      {routes}
    </Router>
  </Provider>, 
  document.getElementById("root"),
);
