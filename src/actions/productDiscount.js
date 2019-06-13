import types from "./actionTypes";
import kidsnParty from "../apis/kidsnParty";
import { history } from "../history";

const update = values => {
  return async function(dispatch) {
    const { product_discount_id } = values;
    // How To:: add post headers for axios
    const response = await kidsnParty.put(
      `/discounts/${product_discount_id}`,
      values
    );
    dispatch({ type: types.getProduct, payload: response.data });
  };
};

const create = values => {
  return async function(dispatch) {
    const response = await kidsnParty.post("/discounts", values);

    dispatch({ type: types.getProduct, payload: response.data });
  };
};

export default {
  create,
  update
};
