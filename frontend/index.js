import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./store/root.store";

const initialState = {};
const store = configureStore(initialState);

import App from "./containers/App/index";
import FrigContainer from "./containers/Frig/Frig.container";
import FormAddingMeal from "./containers/FormAddingMeal";

const Home = (props) => {
  console.log(props)
  return <h1>Home</h1>
}

const NotFound = () => (
  <h1>404.. This page is not found!</h1>);

const Appp = (props) => (
  <Router>
    <App>
      <Route exact path="/" component={FrigContainer} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/add_meal" component={FormAddingMeal} />
      <Route exact path="/404" component={NotFound} />
    </App>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>
    <Appp />
  </Provider>,
  document.getElementById("root"),
);