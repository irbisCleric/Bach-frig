import constants from "./../constants/action.types";

const DEFAULT_STATE = {
    fridgeItems: [],
    isLoading: false,
};

const fridgeItemsReducer = (state, action) => {
    const fridgeItems = action.payload;
    const res = [];

    Object.keys(fridgeItems).forEach((key, i) => {
        if (Object.prototype.hasOwnProperty.call(fridgeItems, i) && i === +i) {
            res.push(fridgeItems[i]);
        }
    });

    return {
        ...state,
        fridgeItems: [...res],
    };
};

const loaderStatus = (state, action) => ({
    ...state,
    isLoading: action.payload.isLoading,
});

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
    case constants.FETCH_FRIDGE_ITEMS:
        return fridgeItemsReducer(state, action);
    case constants.LOAD_STATUS_FRIDGE_ITEMS:
        return loaderStatus(state, action);
    default:
        return state;
    }
};
