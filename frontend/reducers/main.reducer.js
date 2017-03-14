import constants from "./../constants/action.types";

const DEFAULT_STATE = {
    frigItems: [],
};

const someFunc = (state, action) => {
    const frigItems = action.payload.data.frige_food;

    return {
        ...state,
        frigItems: [...frigItems],
    };
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
    case constants.FETCH_FRIG_ITEMS:
        return someFunc(state, action);
    default:
        return state;
    }
};
