import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from "./containers/App";

// Needed for onTouchTap for Material Design
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

ReactDOM.render(
    <App />,
    document.getElementById("root")
);

