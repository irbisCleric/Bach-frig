import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

// import App from "./containers/App";

const element = <h1>UA</h1>;

ReactDOM.render(
    element,
    document.getElementById("root")
);