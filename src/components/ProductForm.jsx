import React, { useReducer, useEffect } from "react";
import { uniqueId } from "lodash";
import moment from "moment";
import CreateNewDiscount from "./CreateNewDiscount";

import ProductFormCategorySelector from "./ProductFormCategorySelector";
import DiscountCard from "./DiscountCard";

const initValues = {
  isShowAddCategoryForm: false,
  image: "",
  fileName: "",
  isGroupon: false,
  formValues: {
    english_name: "",
    chinese_name: "",
    sort_order: 1,
    price: 0,
    location_id: "text_label"
  }
};

const productFormReducer = (state, action) => {
  switch (action.type) {
    case "save":
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

/**
 * funtion - main function for exporting
 * @param {object} props
 */

const ProductForm = ({
  initFormValues,
  image,
  setSelectProductImage,
  onSubmit,
  shops,
  discounts,
  createProductDiscount,
  updateProductDiscount,
  showDiscounts,
  salesGroupList = [],
  product_id,
  removeProductDiscount
}) => {
  const [state, dispatch] = useReducer(productFormReducer, initValues);

  useEffect(() => {
    dispatch({ type: "save", payload: { formValues: initFormValues } });
  }, [initFormValues]);

  const onChange = e => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;

    setSelectProductImage(URL.createObjectURL(files[0]));

    dispatch({ type: "save", payload: { fileName: files[0].name } });

    createImage(files[0]);
  };

  const createImage = file => {
    let reader = new FileReader();
    reader.onload = e => {
      dispatch({ type: "save", payload: { image: e.target.result } });
    };
    reader.readAsDataURL(file);
  };

  const renderImage = () => {
    if (image === "") {
      return null;
    }

    return (
      <div className="component-edit-form__upload-image__img-container">
        <img
          src={image}
          className="component-edit-form__upload-image__img"
          alt=""
        />
      </div>
    );
  };

  // How To:: Upload image / files in React.js
  const getFileName = () => {
    if (state.image === "") {
      return <span>请选择图片</span>;
    }
    return <span>{state.fileName}</span>;
  };

  /**
   * render input JSX from redux form field
   * @param {Object} {input,placeholder,meta}
   * @returns {JSX}
   */
  const renderInput = ({ name, placeholder, className }) => {
    return (
      <div className="form-field">
        <input
          type="text"
          name={name}
          className={className}
          placeholder={placeholder}
          onChange={e => {
            dispatch({
              type: "inputChange",
              payload: { [name]: e.target.value }
            });
          }}
          value={state.formValues[name]}
        />
      </div>
    );
  };

  /**
   * render form validation errors
   *
   */
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="form-error-message">{error}</div>;
    }
  };

  return (
    <div className="component-edit-form">
      <div className="component-edit-form__header">
        <ProductFormCategorySelector />
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit(state.image, state.formValues);
        }}
        className="edit-form"
      >
        <div className="component-edit-form__subtitle">
          商品名称请分别填写中英文
        </div>
        {renderInput({
          name: "chinese_name",
          placeholder: "中文名",
          className: "form-input"
        })}
        {renderInput({
          name: "english_name",
          placeholder: "英文名",
          className: "form-input"
        })}

        <div className="component-edit-form__big-container">
          <div className="component-edit-form__left">
            <div className="component-edit-form__form-field-group">
              <div className="component-edit-form__subtitle">
                商品单价保留小数点后2位.
              </div>
              <div className="component-edit-form__button-group">
                <label className="component-edit-form__button-group__wrapper">
                  {renderInput({
                    name: "price",
                    placeholder: "单价,例如 12.80",
                    className: "component-edit-form__button-group__input"
                  })}
                </label>
              </div>
            </div>
            <div className="component-edit-form__form-field-group">
              <div className="component-edit-form__subtitle">
                商品排序.
                <span style={{ color: "red" }}>必须为整数</span>
              </div>
              <div className="component-edit-form__button-group">
                <label className="component-edit-form__button-group__wrapper">
                  {renderInput({
                    name: "sort_order",
                    placeholder: "数字越大产品显示越靠前",
                    className: "component-edit-form__button-group__input"
                  })}
                </label>
              </div>
            </div>
          </div>

          <div className="component-edit-form__right">
            <div className="component-edit-form__upload-image_container">
              <label className="component-edit-form__upload-image_label">
                <input
                  type="file"
                  onChange={onChange}
                  className="component-edit-form__upload-image_input"
                />
                <i className="material-icons">attachment</i>
                {getFileName()}
              </label>

              {renderImage()}
            </div>
          </div>
        </div>
        <div className="component-edit-form__subtitle">
          联接产品到可以生产的店铺
        </div>

        <select
          className={`select-inputs`}
          name={`location_id`}
          value={state.formValues.location_id}
          onChange={e => {
            dispatch({
              type: "inputChange",
              payload: { location_id: e.target.value }
            });
          }}
        >
          <option value="text_label" disabled={true}>
            请选择可以生产该产品的店铺
          </option>
          {shops.map(shop => {
            const { name, location_id } = shop;
            return (
              <option key={uniqueId("option")} value={location_id}>
                {name}
              </option>
            );
          })}
        </select>

        {showDiscounts && (
          <>
            <DiscountsList
              discounts={discounts}
              createProductDiscount={createProductDiscount}
              updateProductDiscount={updateProductDiscount}
              removeProductDiscount={removeProductDiscount}
            />
            <CreateNewDiscount
              createProductDiscount={createProductDiscount}
              salesGroupList={salesGroupList}
              product_id={product_id}
            />
          </>
        )}

        <div className={`button-container`}>
          <button
            className={`button-add`}
            style={{ backgroundColor: "#FFBA2D" }}
          >
            确认保存
          </button>
        </div>
      </form>
    </div>
  );
};

const DiscountsList = ({
  discounts,
  updateProductDiscount,
  removeProductDiscount
}) => {
  return (
    <div className={`discounts-list`}>
      {discounts.map((discount, i) => {
        return (
          <DiscountCard
            key={`discount-card ${i}`}
            discount={discount}
            updateProductDiscount={updateProductDiscount}
            removeProductDiscount={removeProductDiscount}
          />
        );
      })}
    </div>
  );
};

const validate = formValues => {
  const errors = {};
  if (!formValues.chinese_name) {
    errors.chinese_name = "您需要提供一个有效的中文名";
  }
  if (!formValues.english_name) {
    errors.english_name = "你需要提供一个有效的英文名";
  }
  if (!formValues.price) {
    errors.price = "你需要提供一个有效的价格";
  }
  if (isNaN(formValues.price)) {
    errors.price = "价格必须为数字";
  }
  if (!formValues.quantity) {
    errors.quantity = "请提供一个库存数量值";
  } else if (
    Number(formValues.quantity) === NaN ||
    Number(formValues.quantity) < 0 ||
    !Number.isInteger(Number(formValues.quantity))
  ) {
    errors.quantity = "库存数量必须为正整数";
  }
  if (!formValues.stock_status_id) {
    errors.stock_status_id = "请提供一个库存数量值";
  } else if (
    Number(formValues.stock_status_id) === NaN ||
    Number(formValues.stock_status_id) < 0 ||
    !Number.isInteger(Number(formValues.stock_status_id))
  ) {
    errors.stock_status_id = "库存数量必须为正整数";
  }
  return errors;
};

export default ProductForm;
