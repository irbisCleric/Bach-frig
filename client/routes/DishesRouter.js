import React from "react";
import { Route, Switch } from "react-router-dom";

import DishesContainer from "../containers/DishesContainer";
import DishContainer from "../containers/DishContainer";
import { APP_URLS } from "../constants/app.constants";

const DishesRouter = () => (
    <Switch>
        <Route exact path={APP_URLS.DISHES} component={DishesContainer} />
        <Route path={APP_URLS.DISH} component={DishContainer} />
    </Switch>
);

export default DishesRouter;
