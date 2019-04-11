import React from "react";
import { Field, reduxForm } from "redux-form";
// import DatePicker from "react-datepicker";
import SetTimeForm from "./SetTimeForm";

import { makeDate } from "../../helpers";
import "react-datepicker/dist/react-datepicker.css";
import ShopOpenDate from "./ShopOpenDate";

class ShopForm extends React.Component {
  state = { showTimeForm: false };
  renderInput = ({ label, input, placeholder }) => {
    return (
      <div className="form-field">
        <label>
          <span>{label}</span>
          <input {...input} type="text" placeholder={placeholder} />
        </label>
      </div>
    );
  };
  handleDateChange = formValues => {
    const newDate = formValues;
    this.props.handleDateChange(newDate);
    this.setState({ showTimeForm: false });
  };

  renderOpenDates = () => {
    if (!this.props.shop) {
      return null;
    }
    if (this.props.shop.open.length <= 0) {
      return null;
    }
    return this.props.shop.open.map((openDate, index) => {
      return (
        <span key={`openDate${index}`} className="tag-container">
          <span className="open-date-tags">{makeDate(openDate.date)}</span>
          <span
            className="tag-dismiss"
            onClick={() => {
              this.props.handleDateChange(new Date(openDate.date));
            }}
          >
            <i className="material-icons">clear</i>
          </span>
        </span>
      );
    });
  };
  renderOpenDateTime = date => {};
  getCalendarDayClass = () => {
    return "calendar__day";
  };

  onSubmit = () => {
    this.props.onSubmit();
  };
  render() {
    return (
      <div className="shop-form">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="name"
            label={`店面名`}
            component={this.renderInput}
            placeholder="请输入商店名称"
          />
          <Field
            name="address"
            label={`地址`}
            component={this.renderInput}
            placeholder="请输入商店地址"
          />
          <Field
            name="telephone"
            label={`联系电话`}
            component={this.renderInput}
            placeholder="请输入联系电话"
          />

          <button>{this.props.button_label}</button>
        </form>
        <label
          onClick={() => {
            this.setState({ showTimeForm: true });
          }}
          className="component-shop-form__date-picker__label"
        >
          <span className="component-shop-form__date-picker__title">
            请选择可以取货的日期
          </span>
          <i className="material-icons">date_range</i>
        </label>
        {this.state.showTimeForm ? (
          <SetTimeForm
            onSubmit={this.handleDateChange}
            // initialValues={this.props.shop.open}
            close={() => {
              this.setState({ showTimeForm: false });
            }}
          />
        ) : null}
        <div className="open-dates__list">
          {this.props.shop.open.map(date => {
            return (
              <ShopOpenDate
                date={date}
                key={`${date.open_date}${date.close_time}${date.open_time}`}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "shopForm",
  enableReinitialize: true
})(ShopForm);
