import types from "./actionTypes";
import kidsnParty from "../apis/kidsnParty";

const show = order_id => {
  return async function(dispatch) {
    const response = await kidsnParty.get(`/orders/${order_id}`);

    dispatch({ type: types.selectOrder, payload: response.data.order });
  };
};

const update = () => {
  return async function(dispatch, getState) {
    const requestBody = getState().selectedOrder;
    const { order_id } = requestBody;
    const response = await kidsnParty.put(`/orders/${order_id}`, requestBody);
    dispatch({ type: types.updateOrder, payload: response.data });
  };
};

const patch = value => {
  return async function(dispatch, getState) {
    const { order_id } = getState().selectedOrder;
    const requestBody = { order_status_id: value };
    const response = await kidsnParty.patch(`/orders/${order_id}`, requestBody);

    dispatch({ type: types.updateOrder, payload: response.data });
  };
};
const marking = (order_id, checked) => {
  return async function(dispatch, getState) {
    const value = checked ? 3 : 2;
    const { startDate, endDate } = getState();

    const requestBody = {
      order_status_id: value,
      start_date: startDate,
      end_date: endDate
    };
    const response = await kidsnParty.patch(`/orders/${order_id}`, requestBody);

    dispatch({ type: types.updateOrder, payload: response.data });
  };
};

const index = () => {
  return async function(dispatch, getState) {
    const { startDate, endDate } = getState();

    const response = await kidsnParty.get(`/allorders`, {
      params: {
        start_date: startDate,
        end_date: endDate
      }
    });
    dispatch({ type: types.getOrders, payload: response.data.orders });
  };
};

const onPageChange = pageNumber => {
  return async function(dispatch, getState) {
    const { startDate, endDate } = getState();
    const start_date = startDate;
    const end_date = endDate;
    const response = await kidsnParty.get(`/allorders`, {
      params: {
        page: pageNumber,
        start_date,
        end_date
      }
    });
    dispatch({ type: types.getOrders, payload: response.data.orders });
  };
};
const fetchByStore = () => {
  return async function(dispatch, getState) {
    const { startDate, endDate } = getState();
    const start_date = startDate;
    const end_date = endDate;
    const response = await kidsnParty.get(`/allorders`, {
      params: {
        method: "byStore",
        start_date,
        end_date
      }
    });
    dispatch({ type: types.fetchOrdersByStore, payload: response.data.orders });
  };
};
const fetchBySingleStore = location_id => async (dispatch, getState) => {
  const { startDate, endDate } = getState();
  const start_date = startDate;
  const end_date = endDate;
  const response = await kidsnParty.get(`allorders`, {
    params: {
      method: "all",
      start_date,
      end_date,
      location_id
    }
  });
  dispatch({
    type: types.fetchOrderBySingleStore,
    payload: { orders: response.data.orders.data, location_id }
  });
};
const search = search_string => {
  return async function(dispatch, getState) {
    const { startDate, endDate } = getState();
    const start_date = startDate;
    const end_date = endDate;
    const response = await kidsnParty.get(`/allorders`, {
      params: {
        search_string,
        start_date,
        end_date
      }
    });
    dispatch({ type: types.getOrders, payload: response.data.orders });
  };
};
const advSearch = search_string => {
  return async function(dispatch, getState) {
    const { startDate, endDate } = getState();
    const start_date = startDate;
    const end_date = endDate;
    const response = await kidsnParty.get(`/allorders`, {
      params: {
        method: "adv",
        search_string,
        start_date,
        end_date
      }
    });
    dispatch({ type: types.getOrders, payload: response.data.orders });
  };
};

const fetchbyProducts = () => {
  return async function(dispatch, getState) {
    const { startDate, endDate } = getState();
    const response = await kidsnParty.get(`/report`, {
      params: { startDate, endDate, report_category: "product" }
    });
    dispatch({
      type: types.fetchReportDetails,
      payload: response.data
    });
  };
};

const fetchOrderProductsList = () => {
  return async function(dispatch, getState) {
    const { startDate, endDate } = getState();
    const response = await kidsnParty.get(`/allorders`, {
      params: { start_date: startDate, end_date: endDate, method: "products" }
    });
    dispatch({
      type: types.fetchOrderProductsList,
      payload: response.data
    });
  };
};

export default {
  index,
  show,
  update,
  patch,
  marking,
  search,
  advSearch,
  fetchbyProducts,
  onPageChange,
  fetchByStore,
  fetchBySingleStore,
  fetchOrderProductsList
};
