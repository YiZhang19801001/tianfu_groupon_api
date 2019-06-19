import types from "./actionTypes";
import kidsnParty from "../apis/kidsnParty";
import { history } from "../history";

const index = product_status => {
  return async function(dispatch) {
    const response = await kidsnParty.get("/products", {
      params: { language_id: 2, product_status }
    });

    dispatch({ type: types.getProducts, payload: response.data });
  };
};

const setLocation = value => {
  return { type: types.setNewProductStore, payload: value };
};

const show = id => {
  return async function(dispatch) {
    const response = await kidsnParty.get(`/products/${id}`);

    dispatch({ type: types.getProduct, payload: response.data });
    history.push(`${process.env.PUBLIC_URL}/products/edit/${id}`);
  };
};

const update = (product_id, file, formValues) => {
  return async function(dispatch, getState) {
    const product = formValues;
    const { category } = getState().newProduct;
    // How To:: add post headers for axios
    const headers = { language_id: 2 };
    const response = await kidsnParty.put(
      `/products/${product_id}`,
      {
        product,
        category,
        file
      },
      {
        headers
      }
    );
    dispatch({ type: types.getProducts, payload: response.data });
  };
};
const switchProductStatus = product => {
  return async function(dispatch) {
    const response = await kidsnParty.patch(`/products/${product.product_id}`, {
      product
    });

    dispatch({ type: types.getProducts, payload: response.data });
  };
};

const create = (file, formValues) => {
  return async function(dispatch, getState) {
    const product = formValues;
    const { category } = getState().newProduct;
    const response = await kidsnParty.post("/products", {
      product,
      category,
      file
    });

    dispatch({ type: types.getProducts, payload: response.data.products });
    history.push(`${process.env.PUBLIC_URL}/products`);
  };
};

const removeOption = option_id => {
  return { type: types.removeOption, payload: parseInt(option_id) };
};

const search = (value, product_status) => {
  return async function(dispatch) {
    const response = await kidsnParty.get("products", {
      params: { language_id: 2, product_status, search_string: value }
    });

    dispatch({ type: types.getProducts, payload: response.data });
  };
};

const setImage = value => {
  return {
    type: types.setProductImage,
    payload: value
  };
};
export default {
  index,
  show,
  update,
  setImage,
  switchProductStatus,
  create,
  removeOption,
  search,
  setLocation
};
