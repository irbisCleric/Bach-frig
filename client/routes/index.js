import React, { PropTypes, Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import CoreLayout from "../layouts/CoreLayout";
import AddProductContainer from "../containers/AddProductContainer";
import ProductsContainer from "../containers/ProductsContainer";
import DishesRouter from "./DishesRouter";
import { APP_URLS } from "../constants/app.constants";

// TODO: Should be splitted on routings and AppContainer

const Dashboard = () => {
    const textStyle = {
        paddingLeft: "1rem",
    };

    const descText = "It can for compare your available products with possible recipes.";

    return (
        <section>
            <h1>Welcome to Bachelor fridge</h1>
            <p style={textStyle}>This application created to help you with cooking process.</p>
            <p style={textStyle}>{descText}</p>
        </section>
    );
};
const NotFound = () => (<h1>404.. This page is not found!</h1>);

class AppContainer extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <Router>
                    <CoreLayout>
                    <Switch>
                        <Redirect exact from={APP_URLS.ROOT} to={APP_URLS.DASHBOARD} />
                        <Route path={APP_URLS.DASHBOARD} component={Dashboard} />
                        <Route path={APP_URLS.ADD_PRODUCT} component={AddProductContainer} />
                        <Route path={APP_URLS.PRODUCTS} component={ProductsContainer} />
                        <Route path={APP_URLS.DISHES} component={DishesRouter} />
                        <Route component={NotFound} />
                    </Switch>
                    </CoreLayout>
                </Router>
            </Provider>
        );
    }
}

AppContainer.propTypes = {
    store: PropTypes.shape({
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired,
        replaceReducer: PropTypes.func.isRequired,
        subscribe: PropTypes.func.isRequired,
        Symbol: PropTypes.func,
    }).isRequired,
};

export default AppContainer;
