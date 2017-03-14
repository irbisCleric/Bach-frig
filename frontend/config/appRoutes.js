import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from './../containers/App';
import Layout from './../containers/layouts/Layout.container';

export default (
    <Route path="/" component={App}>
        <Route component={Layout}>
            <IndexRedirect to="app" />

            <Route path="app">
                <IndexRoute component={App} />
            </Route>
        </Route>
    </Route>
);