import constants from "./../constants/action.types";
import appConstants from "./../constants/app.constants";
import apiActions from "./api.actions";

import Api from "../api/ApiClient";
import ep from "../constants/endPoints.constant";

// TODO maybe move to separate file
const apiFactory = new Api({ baseURL: appConstants.API_URL });

export const getFridgeItems = () => (dispatch) => {
    dispatch({
        type: constants.LOAD_STATUS_FRIDGE_ITEMS,
        payload: {
            isLoading: true,
        },
    });

    apiFactory.get(ep.fridge.getFridgeItems())
        .then((response) => {
            dispatch(apiActions.success(constants.FETCH_FRIDGE_ITEMS, response));

            dispatch({
                type: constants.LOAD_STATUS_FRIDGE_ITEMS,
                payload: {
                    isLoading: false,
                },
            });
        });
};

export const setFridgeItem = item => (dispatch) => {
    dispatch({
        type: constants.LOAD_STATUS_FRIDGE_ITEMS,
        payload: {
            isLoading: true,
        },
    });

    apiFactory.post(ep.fridge.setFridgeItem(), item)
        .then((response) => {
            dispatch(apiActions.success(constants.SET_FRIDGE_ITEM, response));

            dispatch({
                type: constants.LOAD_STATUS_FRIDGE_ITEMS,
                payload: {
                    isLoading: false,
                },
            });
        });
};
