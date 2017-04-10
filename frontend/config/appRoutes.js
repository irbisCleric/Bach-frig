import React from "react";
import { Route, IndexRoute, IndexRedirect } from "react-router";

import App from "./../containers/App";
import FormAddingMeal from "./../containers/FormAddingMeal";
// import Layout from "./../containers/layouts/Layout.container";
import FrigContainer from "./../containers/Frig/Frig.container";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";


const NotFound = () => (
  <h1>404.. This page is not found!</h1>);

// TODO refactor main component
import style from "./../containers/App/App.css";

const MainComponent = () => (
  <MuiThemeProvider>
    <div className={style.MainContainer}>
      <div className={style.LeftColumn}>
        <FrigContainer />
      </div>
    </div>
  </MuiThemeProvider>);

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="app" />
    <Route path="app">
      <IndexRoute component={MainComponent} />
    </Route>
    <Route path="add_meal" component={FormAddingMeal} />
    <Route path="*" component={NotFound} />
  </Route>
);
