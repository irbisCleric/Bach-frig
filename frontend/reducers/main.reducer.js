import constants from "./../constants/action.types";

const DEFAULT_STATE = {
    fridgeItems: [],
    isLoading: false,
};

const fridgeItemsReducer = (state, action) => {
    const fridgeItems = action.payload;
    const res = [];

    Object.keys(fridgeItems).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(fridgeItems, key)) {
            res.push(
                Object.assign(fridgeItems[key], { name: key }),
            );
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

const removeItemReducer = state => ({
    ...state,
});

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
    case constants.FETCH_FRIDGE_ITEMS:
        return fridgeItemsReducer(state, action);
    case constants.LOAD_STATUS_FRIDGE_ITEMS:
        return loaderStatus(state, action);
    case constants.DELETE_FRIDGE_ITEM:
        return removeItemReducer(state);
    default:
        return state;
    }
};
