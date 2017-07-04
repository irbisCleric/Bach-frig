import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";

import configureStore from "./store/root.store";
import AppContainer from "./routes";

const initialState = {};
const store = configureStore(initialState);

// (Don't remove this please. It fixes warning bug from Material Design)
// Needed for onTouchTap for Material Design
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    <AppContainer store={store} />,
    document.getElementById("root"),
);
