import axios from "axios";

export const getFrigItems = (params) => (dispatch) => {
    const url = "http://localhost:8181/foods";
    axios.get(url)
        .then((response) => {
            dispatch(success("FETCH_FRIG_ITEMS", response));
        });
};

function success(type, payload) {
    return (dispatch) => {
        const action = payload
            ? { type, payload }
            : { type };

        dispatch(action);
    };
}

