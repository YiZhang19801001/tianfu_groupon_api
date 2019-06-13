import React from "react";

import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { fetchOptions, removeOptionsFromNewProduct } from "../actions";
import ProductFormCategorySelector from "./ProductFormCategorySelector";
import StoreSelector from "./StoreSelector";

// import AddOptionToNewProductForm from "./AddOptionToNewProductForm";
class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productOptions: [],
      isShowAddOptionForm: false,
      isShowAddCategoryForm: false,
      image: "",
      fileName: "",
      isGroupon: false
    };
  }

  onChange = e => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;

    this.props.setSelectProductImage(URL.createObjectURL(files[0]));
    this.setState({
      fileName: files[0].name
    });
    this.createImage(files[0]);
  };
  createImage = file => {
    let reader = new FileReader();
    reader.onload = e => {
      this.setState({
        image: e.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  renderImage = () => {
    if (this.props.image === "") {
      return null;
    }

    return (
      <div className="component-edit-form__upload-image__img-container">
        <img
          src={`${this.props.image}`}
          className="component-edit-form__upload-image__img"
          alt=""
        />
      </div>
    );
  };

  // How To:: Upload image / files in React.js
  getFileName = () => {
    if (this.state.image === "") {
      return <span>请选择图片</span>;
    }
    return <span>{this.state.fileName}</span>;
  };
  componentDidMount() {
    this.props.fetchOptions();
    if (this.props.product) {
      this.setState({ isGroupon: this.props.product.isDiscount });
    }
  }
  /**
   * render input JSX from redux form field
   * @param {Object} {input,placeholder,meta}
   * @returns {JSX}
   */
  renderInput = ({ input, placeholder, meta }) => {
    return (
      <div className="form-field">
        <input
          type="text"
          {...input}
          className="form-input"
          placeholder={placeholder}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  /**
   * render form validation errors
   *
   */
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="form-error-message">{error}</div>;
    }
  };

  /**
   * function - remove group set of product options
   *
   * @param {Event} e
   * @return {Void}
   */
  removeProductOptions = e => {
    const option_id = e.target.dataset.optionId;
    this.props.removeOptionsFromNewProduct(option_id);
  };

  /**
   * function - create JSX for product options
   * @param {Void}
   * @return {JSX}
   */
  renderOptionsJSX = () => {
    if (this.props.newProduct.options) {
      return this.props.newProduct.options.map(option => {
        return (
          <div
            key={`newProductOption${option.option_id}`}
            className="component-edit-form__options"
          >
            <div>
              <span className="component-edit-form__options__name">
                {option.option_name}:{" "}
              </span>
              {this.renderOptionValues(option)}
            </div>
            <div
              onClick={this.removeProductOptions}
              data-option-id={option.option_id}
              className="component-edit-form__options_remove-button"
            >
              <i data-option-id={option.option_id} className="material-icons">
                remove_circle_outline
              </i>
            </div>
          </div>
        );
      });
    } else {
      return null;
    }
  };

  renderOptionValues = option => {
    return option.values.map(value => {
      return (
        <span
          className="component-edit-form__options__value-name"
          key={`newProductOptionValue${value.option_value_id}`}
        >
          {value.option_value_name}
        </span>
      );
    });
  };
  onSubmit = () => {
    this.props.onSubmit(this.state.image, this.state.isGroupon);
  };
  toggleAddOptionToNewProductForm = () => {
    this.setState({ isShowAddOptionForm: !this.state.isShowAddOptionForm });
  };
  renderGrouponControl = () => {
    if (!this.state.isGroupon) {
      return null;
    }
    return (
      <div className="component-eidt-form__groupon-control">
        <div>
          <div className="component-edit-form__subtitle">
            团购价格.
            <span style={{ color: "red" }}>商品团购价保留小数点后2位.</span>
          </div>
          <div className="component-edit-form__button-group">
            <label className="component-edit-form__button-group__wrapper">
              <Field
                name="discountPrice"
                component={this.renderInput}
                className="component-edit-form__button-group__input"
                placeholder="产品团购价格,例如: 10.00"
              />
            </label>
          </div>
        </div>
        <div>
          <div className="component-edit-form__subtitle">
            团购最大值.
            <span style={{ color: "red" }}>必须为整数</span>
          </div>
          <div className="component-edit-form__button-group">
            <label className="component-edit-form__button-group__wrapper">
              <Field
                name="stock_status_id"
                component={this.renderInput}
                placeholder="团购上限,例如:20"
              />
            </label>
          </div>
        </div>
      </div>
    );
  };

  renderGrouponSwitch = () => {
    if (!this.state.isGroupon) {
      return (
        <div
          onClick={() => {
            this.setState({ isGroupon: !this.state.isGroupon });
          }}
          className="groupon-switch__on"
        >
          开启团购
        </div>
      );
    }
    return (
      <div
        onClick={() => {
          this.setState({ isGroupon: !this.state.isGroupon });
        }}
        className="groupon-switch__off"
      >
        关闭团购
      </div>
    );
  };
  render() {
    return (
      <div className="component-edit-form">
        <div className="component-edit-form__header">
          <ProductFormCategorySelector />
        </div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="edit-form"
        >
          <div className="component-edit-form__subtitle">
            商品名称请分别填写中英文
          </div>
          <Field
            name="chinese_name"
            component={this.renderInput}
            placeholder="中文名"
          />
          <Field
            name="english_name"
            component={this.renderInput}
            placeholder="英文名"
          />
          <div className="component-edit-form__big-container">
            <div className="component-edit-form__left">
              <div className="component-edit-form__form-field-group">
                <div className="component-edit-form__subtitle">
                  商品单价保留小数点后2位.
                  {/* <span style={{ color: "red" }}>
                    当配置规格后该商品价格只起展示作用
                  </span> */}
                </div>
                <div className="component-edit-form__button-group">
                  <label className="component-edit-form__button-group__wrapper">
                    <Field
                      name="price"
                      component={this.renderInput}
                      placeholder="单价,例如 12.80"
                      className="component-edit-form__button-group__input"
                    />
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
                    <Field
                      disable
                      name="sort_order"
                      component={this.renderInput}
                      className="component-edit-form__button-group__input"
                      placeholder="数字越大产品显示越靠前"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="component-edit-form__right">
              <div className="component-edit-form__upload-image_container">
                <label className="component-edit-form__upload-image_label">
                  <input
                    type="file"
                    onChange={this.onChange}
                    className="component-edit-form__upload-image_input"
                  />
                  <i className="material-icons">attachment</i>
                  {this.getFileName()}
                </label>

                {this.renderImage()}
              </div>
            </div>
          </div>
          <div className="component-edit-form__subtitle">联接产品到店铺</div>

          <StoreSelector />
          {this.renderGrouponSwitch()}
          {this.renderGrouponControl()}

          {/* <hr />
          <div className="component-edit-form__subtitle">
            <span>添加产品规格.</span>
            <span style={{ color: "red" }}>可不填.</span>
            <div
              onClick={this.toggleAddOptionToNewProductForm}
              className="component-eidt-form__subtitle__button"
            >
              <span>添加新规格</span>
            </div>
          </div>
          <div className="component-edit-form__button-group">
            {this.renderOptionsJSX()}
          </div>
          {this.state.isShowAddOptionForm ? (
            <AddOptionToNewProductForm
              toggleAddOptionToNewProductForm={
                this.toggleAddOptionToNewProductForm
              }
            />
          ) : null} */}
          <div className="component-edit-form__button-wrapper">
            <button className="component-edit-form__submit-button">
              确认保存
            </button>
          </div>
        </form>
      </div>
    );
  }
}

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

const mapStateToProps = ({ options, newProduct }) => {
  return {
    options,
    newProduct
  };
};

const formWrapper = reduxForm({
  form: "productForm",
  validate,
  enableReinitialize: true
})(EditForm);

export default connect(
  mapStateToProps,
  { fetchOptions, removeOptionsFromNewProduct }
)(formWrapper);
