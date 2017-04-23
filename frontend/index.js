import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import injectTapEventPlugin from "react-tap-event-plugin";

import configureStore from "./store/root.store";

import App from "./containers/App/index";
import FridgeContainer from "./containers/Fridge/Fridge.container";
import FormAddingMeal from "./containers/FormAddingMeal";

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
      <Route exact path="/home" component={Home} />
      <Route exact path="/add_meal" component={FormAddingMeal} />
      <Route exact path="/fridge_food" component={FridgeContainer} />
      <Route exact path="/404" component={NotFound} />
    </App>
  </BrowserRouter>
);

ReactDOM.render(
  <Provider store={store}>
    <Appp />
  </Provider>,
  document.getElementById("root"),
);
