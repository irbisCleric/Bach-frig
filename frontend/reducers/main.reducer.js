const DEFAULT_STATE = {
    isLoading: false,
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        // case 'LOADING':
        //     return someFunc(state, action);

        default:
            return state;
    }
};


