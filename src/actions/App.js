import types from "./actionTypes";
import { kidsnparty } from "../apis";
import { history } from "../history";

const setPeriod = sales_group_id => {
  return async function(dispatch, getState) {
    const salesGroupResponse = await kidsnparty.get(
      `/salesgroup/${sales_group_id}`
    );

    const { start_date, end_date } = salesGroupResponse.data.salesGroup;

    const endDate = end_date;
    const startDate = start_date;

    const {
      report_category,
      reportDetails,
      reportSummary,
      orders,
      ordersByStore,
      orderProductsList
    } = getState();

    const numberOfRootPath = process.env.PUBLIC_URL.length;
    const pathname = history.location.pathname.substr(numberOfRootPath);

    if (pathname === "/charts") {
      const response = await kidsnparty.get(`/reports`, {
        params: { startDate, endDate }
      });

      dispatch({
        type: types.setPeriod,
        payload: {
          startDate: startDate,
          endDate: endDate,
          reports: response.data.summary,
          report: reportDetails,
          orders,
          ordersByStore,
          orderProductsList
        }
      });
    } else if (pathname === "/orders" || pathname === "/orders/products") {
      const response = await kidsnparty.get(`/allorders`, {
        params: { start_date, end_date, method: "products" }
      });
      dispatch({
        type: types.setPeriod,
        payload: {
          startDate: startDate,
          endDate: endDate,
          reports: reportSummary,
          report: reportDetails,
          orders,
          ordersByStore,
          orderProductsList: response.data.orders
        }
      });
    } else if (pathname === "/orders/customers") {
      const response = await kidsnparty.get(`/allorders`, {
        params: {
          start_date,
          end_date
        }
      });
      dispatch({
        type: types.setPeriod,
        payload: {
          startDate,
          endDate,
          reports: reportSummary,
          report: reportDetails,
          orders: response.data.orders.data,
          ordersByStore,
          orderProductsList
        }
      });
    } else if (pathname === "/orders/stores") {
      const response = await kidsnparty.get(`/allorders`, {
        params: {
          method: "byStore",
          start_date,
          end_date
        }
      });
      dispatch({
        type: types.setPeriod,
        payload: {
          startDate,
          endDate,
          orders,
          ordersByStore: response.data.orders,
          report: reportDetails,
          reports: reportSummary,
          orderProductsList
        }
      });
    } else {
      const response = await kidsnparty.get(`/report`, {
        params: { startDate, endDate, report_category }
      });
      dispatch({
        type: types.setPeriod,
        payload: {
          startDate: startDate,
          endDate: endDate,
          reports: reportSummary,
          report: response.data,
          orders,
          ordersByStore,
          orderProductsList
        }
      });
    }
  };
};

export default {
  setPeriod
};
