const DEFAULT_STATE = {
    isLoading: false,
    frigItems: [],
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
    case "FETCH_FRIG_ITEMS":
        return someFunc(state, action);
    default:
        return state;
    }
};

const someFunc = (state, action) => {
    const frigItems = action.payload.data.frige_food;

    return {
        ...state,
        frigItems: [...frigItems],
    };
};
