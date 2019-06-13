import React, { useReducer } from "react";
import moment from "moment";

const discountReducer = (editable, action) => {
  switch (action.type) {
    case "toggle":
      return !editable;

    default:
      return editable;
  }
};

const initDiscount = {
  max_quantity: 0,
  sales_group_id: 1,
  quantity: 0,
  product_discount_id: 1
};

export default ({ discount, state, i, dispatch, updateProductDiscount }) => {
  const {
    date_end,
    date_start,
    max_quantity,
    quantity,
    product_discount_id
  } = discount;

  const [editable, editableDispatch] = useReducer(discountReducer, discount);
  return (
    <div
      className={`discount ${!moment().isBefore(date_end) ? "disable" : ""}`}
    >
      <input
        type="text"
        value={state[i] ? state[i].price : 0}
        onChange={e => {
          dispatch({
            type: "update",
            product_discount_id,
            payload: { price: e.target.value }
          });
        }}
        disabled={!moment().isBefore(date_end)}
        className={`discount-price`}
      />
      <div className={`discount-date-group`}>
        <span className={`discount-date-start`}>
          {moment(date_start).format("YY-MMM-D ddd")}
        </span>
        <span>~</span>
        <span className={`discount-date-end`}>
          {moment(date_end).format("YY-MMM-D ddd")}
        </span>
      </div>
      <div className={`discount-quantity-group`}>
        <span className={`quantity-remain`}>{max_quantity - quantity}</span>/
        <span className={`quantity-max`}>{max_quantity}</span>
      </div>
      <div className={`button-group`}>
        {!editable ? (
          <button
            className={`edit`}
            onClick={e => {
              e.preventDefault();
              editableDispatch({ type: "toggle" });
            }}
          >
            edit
          </button>
        ) : (
          <button
            className={`save`}
            onClick={e => {
              e.preventDefault();
              updateProductDiscount(discount);
              editableDispatch({ type: "toggle" });
            }}
          >
            save
          </button>
        )}
      </div>
    </div>
  );
};
