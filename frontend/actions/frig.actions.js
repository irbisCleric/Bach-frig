import axios from "axios";
import constants from "./../constants/action.types";

function success(type, payload) {
    return (dispatch) => {
        const action = payload
            ? { type, payload }
            : { type };

        dispatch(action);
    };
}

export const getFrigItems = () => (dispatch) => {
    const url = "http://localhost:8181/foods";
    axios.get(url)
        .then((response) => {
            dispatch(success(constants.FETCH_FRIG_ITEMS, response));
        });
};



