import React, { PropTypes, Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import CoreLayout from "../layouts/CoreLayout";
import FormAddingMeal from "../containers/FormAddingMeal";
import Fridge from "../containers/Fridge";
import { APP_URLS } from "../constants/app.constants";

// TODO: Should be splitted on routings and AppContainer

const Home = () => (<h1>Home</h1>);
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
                        <Redirect exact from={APP_URLS.ROOT} to={APP_URLS.FRIDGE_FOOD} />
                        <Route path={APP_URLS.HOME} component={Home} />
                        <Route path={APP_URLS.ADD_MEAL} component={FormAddingMeal} />
                        <Route path={APP_URLS.FRIDGE_FOOD} component={Fridge} />
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
