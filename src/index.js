import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import injectTapEventPlugin from "react-tap-event-plugin";

import configureStore from "./store/root.store";

import App from "./containers/App/index";
import FridgeContainer from "./containers/Fridge/Fridge.container";
import FormAddingMeal from "./containers/FormAddingMeal";
import { APP_URLS } from "./constants/app.constants";

const initialState = {};
const store = configureStore(initialState);

// (Don't remove this please. It fixes warning bug from Material Design)
// Needed for onTouchTap for Material Design
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const Home = (props) => {
    console.log(props);
    return <h1>Home</h1>;
};

const NotFound = () => (
  <h1>404.. This page is not found!</h1>);
const Appp = () => (
  <BrowserRouter>
    <App>
      <Switch>
        <Redirect exact from={APP_URLS.ROOT} to={APP_URLS.FRIDGE_FOOD} />
        <Route path={APP_URLS.HOME} component={Home} />
        <Route path={APP_URLS.ADD_MEAL} component={FormAddingMeal} />
        <Route path={APP_URLS.FRIDGE_FOOD} component={FridgeContainer} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </BrowserRouter>
);

ReactDOM.render(
  <Provider store={store}>
    <Appp />
  </Provider>,
  document.getElementById("root"),
);
