import axios from "axios";
import constants from "./../constants/action.types";
import appConstants from "./../constants/app.constants";
import apiActions from "./api.actions";

import Api from "../api/ApiClient";
import ep from "../constants/endPoints.constant";

const test = new Api({ baseURL: appConstants.API_URL });

export const getFrigItems = () => (dispatch) => {
    test.get(ep.frig.getFrigItems())
        .then((response) => {
            dispatch(apiActions.success(constants.FETCH_FRIG_ITEMS, response));
        });
};

export const addFrigItem = () => (dispatch) => {
    axios.get(constants.API_URL)
        .then((response) => {
            dispatch(apiActions.success(appConstants.FETCH_FRIG_ITEMS, response));
        });
};



