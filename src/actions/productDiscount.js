import types from "./actionTypes";
import kidsnParty from "../apis/kidsnParty";

const update = values => {
  return async function(dispatch) {
    const { product_discount_id } = values;
    // How To:: add post headers for axios
    const response = await kidsnParty.put(
      `/discounts/${product_discount_id}`,
      values
    );
    dispatch({ type: types.getProduct, payload: response.data.product });
  };
};

const create = values => {
  return async function(dispatch) {
    const response = await kidsnParty.post("/discounts", values);

    dispatch({ type: types.getProduct, payload: response.data.product });
  };
};

const remove = product_discount_id => {
  return async function(dispatch) {
    const response = await kidsnParty.delete(
      `/discounts/${product_discount_id}`,
      { params: { product_discount_id } }
    );

    dispatch({ type: types.getProduct, payload: response.data.product });
  };
};

export default {
  create,
  update,
  remove
};
