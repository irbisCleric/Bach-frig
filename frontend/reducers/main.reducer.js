import constants from "./../constants/action.types";

const DEFAULT_STATE = {
    frigItems: [],
};

const someFunc = (state, action) => {
    const frigItems = action.payload;
    const res = [];

    for (const i in frigItems) {
        if ( frigItems.hasOwnProperty(i) && i == +i) {
            res.push(frigItems[i]);
        }
    }

    return {
        ...state,
        frigItems: [...res],
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
