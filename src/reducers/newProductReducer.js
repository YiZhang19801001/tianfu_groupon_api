import { actionTypes } from "../actions";
import { types } from "util";

const newProductReducer = (newProduct = {}, action) => {
  switch (action.type) {
    case actionTypes.getProduct:
      return {
        ...newProduct,
        options: action.payload.options,
        category: action.payload.category
      };
    case actionTypes.setNewProductCategory:
      return { ...newProduct, category: action.payload };
    case actionTypes.setNewProductOptions:
      let newOptions = [];
      if (newProduct.options) {
        newOptions = [...newProduct.options, action.payload];
      } else {
        newOptions = [...newOptions, action.payload];
      }
      return { ...newProduct, options: newOptions };
    case actionTypes.refreshNewProduct:
      return {};
    case actionTypes.removeOption:
      newOptions = [];
      newOptions = newProduct.options.filter(
        element => element.option_id !== action.payload
      );
      return { ...newProduct, options: newOptions };
    case actionTypes.setNewProductStore:
      return {
        ...newProduct,
        location_id: action.payload
      };
    default:
      return newProduct;
  }
};

export default newProductReducer;
