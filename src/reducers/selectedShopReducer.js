import { actionTypes } from "../actions";
import { makeDate } from "../helpers";

const selectedShopReducer = (
  selectedShop = { open: [{ open_date: "", open_time: "", close_time: "" }] },
  action
) => {
  console.log({ action });

  const checkOpenDates = newDate => {
    let flag = false;
    if (!selectedShop || !selectedShop.open) {
      return false;
    }
    selectedShop.open.map(element => {
      if (
        makeDate(element.open_date) === makeDate(newDate.open_date) &&
        element.open_time === newDate.open_time &&
        element.close_time === newDate.close_time
      ) {
        flag = true;
      }
    });
    return flag;
  };
  if (action.type === actionTypes.fetchSingleShop) {
    return action.payload;
  } else if (action.type === actionTypes.shopOpenDateChange) {
    console.log("date added");

    const newDate = action.payload;
    const isIncludes = checkOpenDates(newDate);
    if (!isIncludes) {
      return {
        ...selectedShop,
        open: [...selectedShop.open, newDate]
      };
    }
    return selectedShop;
  } else if (action.type === actionTypes.dismissDate) {
    const newDate = action.payload;
    console.log("worked");

    return {
      ...selectedShop,
      open: selectedShop.open.filter(
        element =>
          !(
            makeDate(element.open_date) === makeDate(newDate.open_date) &&
            element.open_time === newDate.open_time &&
            element.close_time === newDate.close_time
          )
      )
    };
  }
  return selectedShop;
};

export default selectedShopReducer;
