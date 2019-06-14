import React, { useReducer, useEffect } from "react";
import moment from "moment";

const reducer = (state, action) => {
  switch (action.type) {
    case "toggle":
      return { ...state, editable: !state.editable };
    case "inputChange":
      return {
        ...state,
        formValues: { ...state.formValues, ...action.payload }
      };
    default:
      return state;
  }
};

const initState = {
  editable: false,
  formValues: {
    max_quantity: 0,
    sales_group_id: 1,
    quantity: 0,
    product_discount_id: 1,
    price: 0,
    date_end: "",
    date_start: ""
  }
};

export default ({ discount, updateProductDiscount, removeProductDiscount }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    dispatch({ type: "inputChange", payload: discount });
  }, [discount]);

  const {
    max_quantity,
    sales_group_id,
    quantity,
    product_discount_id,
    price,
    date_end,
    date_start
  } = state.formValues;

  return (
    <div
      className={`discount ${!moment().isBefore(date_end) ? "disable" : ""}`}
    >
      <input
        type="text"
        value={price}
        onChange={e => {
          dispatch({
            type: "inputChange",
            payload: { price: e.target.value }
          });
        }}
        disabled={!moment().isBefore(date_end) || !state.editable}
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
        <input
          className={`quantity-remain`}
          disabled={!state.editable}
          value={quantity}
          onChange={e => {
            dispatch({
              type: "inputChange",
              payload: { quantity: e.target.value }
            });
          }}
        />
        /
        <input
          className={`quantity-max`}
          disabled={!state.editable}
          value={max_quantity}
          onChange={e => {
            dispatch({
              type: "inputChange",
              payload: { max_quantity: e.target.value }
            });
          }}
        />
      </div>
      <div className={`button-group`}>
        {!state.editable ? (
          <button
            className={`edit`}
            onClick={e => {
              e.preventDefault();
              dispatch({ type: "toggle" });
            }}
          >
            edit
          </button>
        ) : (
          <button
            className={`save`}
            onClick={e => {
              e.preventDefault();
              updateProductDiscount(state.formValues);
              dispatch({ type: "toggle" });
            }}
          >
            save
          </button>
        )}

        <button
          className={`remove`}
          onClick={e => {
            e.preventDefault();
            removeProductDiscount(product_discount_id);
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
};
