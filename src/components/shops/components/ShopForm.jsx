import React, { useReducer, useEffect } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "setState":
      return { ...state, ...action.payload };

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
    name: "",
    address: "",
    telephone: ""
  }
};

const ShopForm = ({ initFormValues, onSubmit, setShopsLayout }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const { formValues } = state;
  const { name, address, telephone } = formValues;
  useEffect(() => {
    dispatch({ type: "setState", payload: { formValues: initFormValues } });
  }, [initFormValues]);

  const onChange = e => {
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
        setShopsLayout({ path: "list" });
      }}
    >
      <div className={`form-field`}>
        <label htmlFor="name">店铺名</label>
        <input
          type="text"
          name="name"
          placeholder={`请输入店铺名`}
          value={name}
          onChange={onChange}
        />
      </div>
      <div className={`form-field`}>
        <label htmlFor="telephone">电话</label>
        <input
          type="text"
          name="telephone"
          placeholder={`请输入店铺电话`}
          value={telephone}
          onChange={onChange}
        />
      </div>
      <div className={`form-field`}>
        <label htmlFor="address">地址</label>
        <input
          type="text"
          name="address"
          placeholder={`请输入店铺电话`}
          value={address}
          onChange={onChange}
        />
      </div>
      <div className={`button-container`}>
        <button className={`button-save`}>save</button>
        <button className={`button-cancel`}>cancel</button>
      </div>
    </form>
  );
};

export default ShopForm;
