import constants from "./../constants/action.types";
import appConstants from "./../constants/app.constants";
import apiActions from "./api.actions";

import Api from "../api/ApiClient";
import ep from "../constants/endPoints.constant";

// TODO maybe move to separate file
const apiFactory = new Api({ baseURL: appConstants.API_URL });

const getFrigItems = () => (dispatch) => {
    apiFactory.get(ep.frig.getFrigItems())
        .then((response) => {
            dispatch(apiActions.success(constants.FETCH_FRIG_ITEMS, response));
        });
};

export default getFrigItems;
