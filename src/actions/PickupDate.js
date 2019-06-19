import types from "./actionTypes";
import { kidsnparty } from "../apis";

const store = formValues => async (dispatch, getState) => {
  const { sales_group_id } = getState().salesGroup;
  const response = await kidsnparty.post("/pickupdates", {
    ...formValues,
    sales_group_id: sales_group_id
  });

  dispatch({
    type: types.CREATE_PICKUP_DATE,
    payload: response.data.locations
  });
};

const update = (id, date) => async (dispatch, getState) => {
  const { sales_group_id } = getState().salesGroup;

  const response = await kidsnparty.put(`/pickupdates/${id}`, {
    date,
    sales_group_id
  });

  dispatch({
    type: types.UPDATE_PICKUP_DATE,
    payload: response.data.locations
  });
};

const remove = id => async (dispatch, getState) => {
  const { sales_group_id } = getState().salesGroup;
  const response = await kidsnparty.delete(`/pickupdates/${id}`, {
    params: { sales_group_id }
  });

  dispatch({
    type: types.UPDATE_PICKUP_DATE,
    payload: response.data.locations
  });
};

export default {
  store,
  update,
  delete: remove
};
