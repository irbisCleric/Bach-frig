import { combineReducers } from "redux";

/**
 * Reducers
 */
import main from "./main.reducer";

const rootReducer = combineReducers({
    main,
});

export default rootReducer;
