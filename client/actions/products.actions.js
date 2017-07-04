import constants from "./../constants/action.types";
import appConstants from "./../constants/app.constants";
import apiActions from "./api.actions";

import Api from "../api/ApiClient";
import ep from "../constants/endPoints.constant";

// TODO maybe move to separate file
const apiFactory = new Api({ baseURL: appConstants.API_URL });

/* eslint-disable no-alert, no-console */
const errorLogger = (reason) => {
    // Log the rejection reason
    console.log(`Handle rejected promise ('${reason}') here.`);
};
/* eslint-enable no-alert, no-console */

export const getProducts = () => (dispatch) => {
    dispatch({
        type: constants.LOAD_STATUS_PRODUCTS,
        payload: {
            isLoading: true,
        },
    });

    apiFactory.get(ep.products.getProducts())
        .then((response) => {
            dispatch(apiActions.success(constants.FETCH_PRODUCTS, response));

            dispatch({
                type: constants.LOAD_STATUS_PRODUCTS,
                payload: {
                    isLoading: false,
                },
            });
        })
        .catch(errorLogger);
};

export const setProduct = item => (dispatch) => {
    dispatch({
        type: constants.LOAD_STATUS_PRODUCTS,
        payload: {
            isLoading: true,
        },
    });

    apiFactory.post(ep.products.setProduct(), item)
        .then((response) => {
            dispatch(apiActions.success(constants.SET_PRODUCT, response));

            dispatch({
                type: constants.LOAD_STATUS_PRODUCTS,
                payload: {
                    isLoading: false,
                },
            });
        })
        .catch(errorLogger);
};


export const deleteProduct = snapshotName => (dispatch) => {
    apiFactory.delete(ep.products.deleteProduct(snapshotName))
        .then(() => {
            dispatch({
                type: constants.DELETE_PRODUCT,
            });
        })
        .catch(errorLogger);
};
