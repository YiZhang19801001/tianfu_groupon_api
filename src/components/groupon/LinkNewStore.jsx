import React, { useReducer } from "react";
import { uniqueId } from "lodash";

const reducer = (state, action) => {
  switch (action.type) {
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
  formValues: {
    location_id: `text_label`,
    date: ""
  }
};

export default ({
  shops,
  createPickupDate,
  salesGroup,
  setLocationPageLayout
}) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const { formValues } = state;
  const { location_id, date } = formValues;
  const { start_date, end_date } = salesGroup;

  const onSubmit = e => {
    e.preventDefault();
    createPickupDate(formValues);
  };

  const onChange = e => {
    dispatch({
      type: "inputChange",
      payload: { [e.target.name]: e.target.value }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <select value={location_id} name={`location_id`} onChange={onChange}>
        <option value={`text_label`} disabled={true}>
          请选择要关联的店铺
        </option>
        {shops.map(x => {
          return (
            <option key={uniqueId()} value={x.location_id}>
              {x.name}
            </option>
          );
        })}
      </select>
      <input
        type="date"
        name={`date`}
        min={start_date}
        max={end_date}
        value={date}
        onChange={onChange}
      />
      <button>save</button>
      <button
        onClick={e => {
          e.preventDefault();
          setLocationPageLayout({ mode: "showList" });
        }}
      >
        cancel
      </button>
    </form>
  );
};
