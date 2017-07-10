import React from "react";
import { Route, Switch } from "react-router-dom";

import ProductsCountainer from "../containers/ProductsContainer";
import ProductContainer from "../containers/ProductContainer";
import { APP_URLS } from "../constants/app.constants";

const ProductsRouter = () => (
    <Switch>
        <Route exact path={APP_URLS.PRODUCTS} component={ProductsCountainer} />
        <Route path={APP_URLS.PRODUCT} component={ProductContainer} />
    </Switch>
);

export default ProductsRouter;
