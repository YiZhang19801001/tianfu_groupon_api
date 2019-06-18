import React, { useReducer, useEffect } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "inputChange":
      return {
        ...state,
        formValues: { ...state.formValues, ...action.payload }
      };
    case "setState":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

const initState = {
  formValues: {
    name: "",
    end_date: "",
    start_date: ""
  }
};

const SalesGroupForm = ({ onSubmit, salesGroup = initState.formValues }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    dispatch({ type: "setState", payload: { formValues: salesGroup } });
  }, [salesGroup]);
  const { end_date, start_date, name } = state.formValues;

  const handleOnChange = e => {
    e.preventDefault();

    dispatch({
      type: "inputChange",
      payload: { [e.target.name]: e.target.value }
    });
  };
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(state.formValues);
      }}
    >
      <div className="form-field">
        <label>
          <span>团名</span>
          <input
            type="text"
            value={name}
            name={`name`}
            onChange={handleOnChange}
            placeholder={`请填写本次打折团的名称`}
          />
        </label>
      </div>
      <div className="form-field">
        <label>
          <span>起始日期</span>
          <input
            type="date"
            placeholder={`请输入起始日期`}
            onChange={handleOnChange}
            name={`start_date`}
            value={start_date}
            max={end_date}
          />
        </label>
      </div>
      <div className="form-field">
        <label>
          <span>截止日期</span>
          <input
            type="date"
            placeholder={`请输入截止日期`}
            onChange={handleOnChange}
            name={`end_date`}
            value={end_date}
            min={start_date}
          />
        </label>
      </div>
      <button>确认保存</button>
    </form>
  );
};

export default SalesGroupForm;

const validate = formValues => {
  const errors = {};
  if (!formValues.chinese_name) {
    errors.chinese_name = "您需要提供一个有效的中文名";
  }
  if (!formValues.english_name) {
    errors.english_name = "你需要提供一个有效的英文名";
  }
  return errors;
};
