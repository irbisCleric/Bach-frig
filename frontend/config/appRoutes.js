import React from "react";
import { Route, IndexRoute, IndexRedirect } from "react-router";

import App from "./../containers/App";
import FormAddingMeal from "./../containers/FormAddingMeal";
// import Layout from "./../containers/layouts/Layout.container";

const NotFound = () => (
  <h1>404.. This page is not found!</h1>);

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="app" />
    <Route path="app">
      <IndexRoute component={App} />
    </Route>
    <Route path="add_meal" component={FormAddingMeal} />
    <Route path="*" component={NotFound} />
  </Route>
);
