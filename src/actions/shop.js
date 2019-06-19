import types from "./actionTypes";

import kidsnParty from "../apis/kidsnParty";

export const index = () => {
  return async function(dispatch) {
    const response = await kidsnParty.get(`/locations`);
    dispatch({ type: types.getShops, payload: response.data.locations });
  };
};
export const fetchShop = location_id => {
  return async function(dispatch) {
    const response = await kidsnParty.get(`/locations/${location_id}`);
    dispatch({
      type: types.fetchSingleShop,
      payload: response.data.shop
    });
    // history.push(`${process.env.PUBLIC_URL}/shops/update/${location_id}`);
  };
};

const create = () => {
  return async function(dispatch, getState) {
    const requestBody = {
      ...getState().form.shopForm.values,
      open: getState().selectedShop.open
    };
    const response = await kidsnParty.post(`/locations`, requestBody);

    dispatch({
      type: types.getShops,
      payload: response.data.locations
    });
  };
};

const update = () => {
  return async function(dispatch, getState) {
    const requestBody = {
      ...getState().form.shopForm.values,
      open: getState().selectedShop.open
    };
    const { location_id } = getState().selectedShop;
    const response = await kidsnParty.put(
      `/locations/${location_id}`,
      requestBody
    );

    dispatch({ type: types.getShops, payload: response.data.locations });
  };
};

const patch = shop => {
  return {
    type: types.fetchSingleShop,
    payload: shop
  };
};

const handleDateChange = newDate => {
  return {
    type: types.shopOpenDateChange,
    payload: newDate
  };
};

const remove = location_id => {
  return async function(dispatch) {
    const response = await kidsnParty.delete(`/locations/${location_id}`);
    dispatch({ type: types.getShops, payload: response.data.locations });
  };
};

const active = location_id => {
  return async function(dispatch) {
    const response = await kidsnParty.patch(`/locations/${location_id}`);
    dispatch({ type: types.getShops, payload: response.data.locations });
  };
};

const dismissDate = newDate => {
  return {
    type: types.dismissDate,
    payload: newDate
  };
};

const getShopsBySalesGroupId = sales_group_id => {
  return async function(dispatch) {
    const response = await kidsnParty.get(
      `/locations?sales_group_id=${sales_group_id}`
    );
    dispatch({ type: types.getShops, payload: response.data.locations });
  };
};
/**
 * function - call api get all shops
 */
const getAvailableShops = () => {
  return async function(dispatch) {
    const response = await kidsnParty.get(`/locations`);
    dispatch({ type: types.GET_ALL_SHOPS, payload: response.data.locations });
  };
};

export default {
  index,
  active,
  remove,
  fetchShop,
  create,
  update,
  patch,
  dismissDate,
  handleDateChange,
  getShopsBySalesGroupId,
  getAvailableShops
};
