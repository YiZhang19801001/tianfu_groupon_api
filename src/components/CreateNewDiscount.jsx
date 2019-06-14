import React, { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "inputChange":
      return {
        ...state,
        formValues: { ...state.formValues, ...action.payload }
      };
    case "close":
      return {
        ...state,
        showForm: false
      };
    case "open":
      return {
        ...state,
        showForm: true
      };
    default:
      return state;
  }
};

const initState = {
  showForm: false,
  formValues: {
    price: 0,
    max_quantity: 0,
    quantity: 0,
    sales_group_id: "text_label"
  }
};

export default ({ createProductDiscount, product_id, salesGroupList }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  console.log({ product_id });
  const onChange = e => {
    dispatch({
      type: "inputChange",
      payload: { [e.target.name]: e.target.value }
    });
  };

  const formFields = [
    {
      name: "price",
      onChange: onChange,
      label: "价格",
      type: "text",
      placeholder: "请输入本次团购价格"
    },
    {
      name: "quantity",
      label: "库存",
      onChange: onChange,
      type: "number",
      placeholder: "请输入库存，不可大于限购数量"
    },
    {
      name: "max_quantity",
      label: "最大数量",
      onChange: onChange,
      type: "number",
      placeholder: "请输入本次团购限购数量"
    }
  ];

  if (!state.showForm) {
    return (
      <div className={`button-container`}>
        <button
          className={`button-add`}
          onClick={e => {
            e.preventDefault();
            dispatch({ type: "open" });
          }}
        >
          add new
        </button>
      </div>
    );
  }

  return (
    <div className={`add-product-discount`}>
      {formFields.map(field => {
        const { name, label, onChange, type, placeholder } = field;
        return (
          <div key={name} className={`field`}>
            <label className={`label`}>
              <span className={`name`}>{label}</span>
              <input
                type={type}
                name={name}
                onChange={onChange}
                value={state.formValues[name]}
                placeholder={placeholder}
                className={`input`}
              />
            </label>
          </div>
        );
      })}
      <select
        name="sales_group_id"
        value={state.formValues.sales_group_id}
        onChange={e => {
          dispatch({
            type: "inputChange",
            payload: { sales_group_id: e.target.value }
          });
        }}
        className={`select`}
      >
        <option value="text_label" disabled={true}>
          请选择关联的团
        </option>
        {salesGroupList.map(x => {
          const { sales_group_id, start_date, end_date, name } = x;
          return (
            <option key={sales_group_id} value={sales_group_id}>
              {`${name}: ${start_date} - ${end_date}`}
            </option>
          );
        })}
      </select>
      <div className={`button-group`}>
        <button
          onClick={e => {
            e.preventDefault();
            createProductDiscount({
              ...state.formValues,
              product_id: product_id
            });
          }}
          className={`button-add`}
        >
          save
        </button>
        <button
          onClick={e => {
            e.preventDefault();
            dispatch({ type: "close" });
          }}
          className={`button-cancel`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
