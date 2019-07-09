import types from "./actionTypes";
import { kidsnparty } from "../apis";
const index = () => {
  return async function(dispatch) {
    const response = await kidsnparty.get("/salesgroups");
    dispatch({
      type: types.fetchSalesGroups,
      payload: response.data.salesGroups,
      salesGroup: response.data.salesGroups[0],
      salesGroupId: response.data.salesGroups[0].sales_group_id
    });
  };
};
const store = formValues => {
  return async function(dispatch) {
    const requestBody = formValues;
    const response = await kidsnparty.post("/salesgroups", requestBody);
    dispatch({
      type: types.fetchSalesGroups,
      payload: response.data.salesGroups,
      salesGroup:
        response.data.salesGroups[response.data.salesGroups.length - 1],
      salesGroupId:
        response.data.salesGroups[response.data.salesGroups.length - 1]
          .sales_group_id
    });
  };
};
const update = (salesGroupId, formValues) => {
  return async function(dispatch) {
    const requestBody = formValues;
    const response = await kidsnparty.put(
      `/salesgroups/${salesGroupId}`,
      requestBody
    );
    dispatch({
      type: types.fetchSalesGroups,
      payload: response.data.salesGroups,
      salesGroup:
        response.data.salesGroups[response.data.salesGroups.length - 1],
      salesGroupId:
        response.data.salesGroups[response.data.salesGroups.length - 1]
          .sales_group_id
    });
  };
};
const show = salesGroupId => {
  return async function(dispatch) {
    const response = await kidsnparty.get(`/salesgroup/${salesGroupId}`);
    dispatch({
      type: types.fetchSalesGroup,
      payload: response.data.salesGroup
    });
  };
};

export default {
  index,
  store,
  update,
  show
};
