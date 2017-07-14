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
            dispatch(apiActions.success(constants.GET_PRODUCTS, response));

            dispatch({
                type: constants.LOAD_STATUS_PRODUCTS,
                payload: {
                    isLoading: false,
                },
            });
        })
        .catch(errorLogger);
};

export const getProduct = snapshotKey => (dispatch) => {
    apiFactory.get(ep.products.getProduct(snapshotKey))
        .then((response) => {
            dispatch(apiActions.success(constants.GET_PRODUCT, response));
        })
        .catch(errorLogger);
};

export const setProduct = item => (dispatch) => {
    apiFactory.post(ep.products.setProduct(), item)
        .then((response) => {
            dispatch(apiActions.success(constants.SET_PRODUCT, response));
            dispatch({
                type: constants.ADDED_PRODUCT,
                payload: {
                    productAdded: true,
                },
                msg: response.msg || "",
            });
        })
        .catch(errorLogger);
};


export const deleteProduct = ({ key, id }) => (dispatch) => {
    apiFactory.delete(ep.products.deleteProduct(key))
        .then((response) => {
            dispatch(apiActions.success(constants.DELETE_PRODUCT, response));
            dispatch({
                type: constants.DELETED_PRODUCT,
                payload: {
                    productRemoved: true,
                    productId: id,
                },
                msg: response.msg || "",
            });
        })
        .catch(errorLogger);
};
