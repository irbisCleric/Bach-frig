export default {
    // save in the api Reducer
    // request(key, value = true) {
    //     return {
    //         type: apiTypes.SET_LOADING,
    //         payload: { key, value },
    //     };
    // },

    success(type, payload) {
        return (dispatch) => {
            // dispatch(this.request(type, false));

            const action = payload
                ? { type, payload }
                : { type };

            dispatch(action);
        };
    },

    // save in the api Reducer
    failure(key, error) {
        return (dispatch) => {
            // dispatch(this.request(key, false));

            const action = {
                // type: apiTypes.SET_ERROR,
                error: {
                    key,
                    value: {
                        ...error,
                        // ...httpStatusHandler(error.status),
                    },
                },
            };

            dispatch(action);
        };
    },
};
