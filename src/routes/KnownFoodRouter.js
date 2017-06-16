import React from "react";
import { Route, Switch } from "react-router-dom";

import KnownFood from "../containers/KnownFood";
import KnownFoodItem from "../containers/KnownFoodItem";
import { APP_URLS } from "../constants/app.constants";

const KnownFoodRouter = () => (
    <Switch>
        <Route exact path={APP_URLS.KNOWN_FOOD} component={KnownFood} />
        <Route path={APP_URLS.KNOWN_FOOD_ITEM} component={KnownFoodItem} />
    </Switch>
);

export default KnownFoodRouter;
