// Use browser history with server side settings (history-api-fallback)
// Ex. For node express see 'express-history-api-fallback'
// For webpack dev server run with '--history-api-fallback' flag
// import { browserHistory } from 'react-router';
//
// const appHistory = browserHistory;

// Use hash history if you cannot configure server side

// IMPORTANT history.getCurrentLocation was removed in history v4.0.0-2.
// Try downgrading to history : "^3.0.0" since you are using react-router v3.

import { useRouterHistory } from "react-router";
import { createHashHistory } from "history";

const appHistory = useRouterHistory(createHashHistory)({ });

export default appHistory;
