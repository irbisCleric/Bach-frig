import constants from "./../constants/action.types";

const DEFAULT_STATE = {
    frigItems: [],
    isLoading: false,
};

const someFunc = (state, action) => {
    const frigItems = action.payload;
    const res = [];

    Object.keys(frigItems).forEach((key, i) => {
        if (Object.prototype.hasOwnProperty.call(frigItems, i) && i === +i) {
            res.push(frigItems[i]);
        }
    });

    return {
        ...state,
        frigItems: [...res],
    };
};

const loaderStatus = (state, action) => ({
    ...state,
    isLoading: action.payload.isLoading,
});

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
    case constants.FETCH_FRIG_ITEMS:
        return someFunc(state, action);
    case constants.LOAD_STATUS_FRIG_ITEMS:
        return loaderStatus(state, action);
    default:
        return state;
    }
};
