import constants from "./../constants/action.types";

const DEFAULT_STATE = {
    productsItems: [],
    product: [],
    isLoading: false,
    productAdded: false,
};

const productsItemsReducer = (state, action) => {
    const productsItems = action.payload;
    const res = [];

    if (!productsItems) {
        return state;
    }

    Object.keys(productsItems).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(productsItems, key)) {
            res.push(
                Object.assign(productsItems[key], { id: key }),
            );
        }
    });

    return {
        ...state,
        productsItems: [...res],
    };
};

const loaderStatusReducer = (state, action) => ({
    ...state,
    isLoading: action.payload.isLoading,
});

/**
 * Status flag for snackbar
 * (show when product is added)
 * @param {*} state
 * @param {*} action
 */
const productAddedReducer = (state, action) => ({
    ...state,
    productAdded: action.payload.productAdded,
});

const getProductReducer = (state, action) => {
    const res = [];
    const { product } = action.payload;
    res.push(product);

    return {
        ...state,
        product: res,
    };
};

const removeItemReducer = state => ({
    ...state,
});

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
    case constants.GET_PRODUCTS:
        return productsItemsReducer(state, action);
    case constants.GET_PRODUCT:
        return getProductReducer(state, action);
    case constants.LOAD_STATUS_PRODUCTS:
        return loaderStatusReducer(state, action);
    case constants.ADDED_PRODUCT:
        return productAddedReducer(state, action);
    case constants.DELETE_PRODUCT:
        return removeItemReducer(state);
    default:
        return state;
    }
};
