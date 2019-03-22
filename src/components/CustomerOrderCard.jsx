import React from "react";
import { connect } from "react-redux";
import { selectOrder, markingOrder } from "../actions";

class CustomerOrderCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.order.order_status_id === 3
    };
  }

  getContent = value => {
    if (value === "") {
      return "用户尚未选择或填写";
    } else {
      return value;
    }
  };
  /**
   * function: create different style css code according to order status
   * @param {void}
   * @return {css} css in-line style
   */
  getStyle = () => {
    switch (parseInt(this.props.order.order_status_id)) {
      case 2:
        return {
          orderCard_tab: {
            backgroundColor: `#f55747`,
            borderColor: `#93352c`
          },
          orderCard_userName: { textShadow: `0px 0px 3px #f55747` },
          title: { borderColor: `#f55747` }
        };
      case 1:
        return {
          orderCard_tab: {
            backgroundColor: `#ffba2d`,
            borderColor: `#946b19`
          },
          orderCard_userName: { textShadow: `0px 0px 3px #ffba2d` },
          title: { borderColor: `#ffba2d` }
        };
      case 3:
        return {
          orderCard_tab: {
            backgroundColor: `#dfdede`,
            borderColor: `#5f5e5e`,
            color: `#a5a5a5`
          },
          orderCard_userName: { textShadow: `0px 0px 3px #dfdede` },
          title: { borderColor: `#dfdede` }
        };
      case 6:
        return {
          orderCard_tab: {
            backgroundColor: `#f55747`,
            borderColor: `#93352c`
          },
          orderCard_userName: { textShadow: `0px 0px 3px #f55747` },
          title: { borderColor: `#f55747` }
        };
      default:
        return {};
    }
  };
  /**
   * render JSX for order items in a string not list
   * @param {void}
   * @returns {JSX}
   */
  renderOrderItems = () => {
    if (this.props.order.order_items) {
      return (
        <div className="component-customer-order-card__order-items">
          {this.props.order.order_items.map((item, index) => {
            return (
              <span key={`CustomerOrderItem${index}`}>
                {`${item.name} x ${item.quantity}, `}
              </span>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="component-customer-order-card__order-items">
          {"用户尚未选择任何产品"}
        </div>
      );
    }
  };
  /**
   * nav to select order detail
   *
   */
  selectOrder = () => {
    this.props.selectOrder(this.props.order.order_id);
    this.props.showDetails();
  };
  getButton = () => {
    if (parseInt(this.props.order.order_status_id) === 1) {
      return null;
    }
    return (
      <div className="component-customer-order-card__check-button">
        <div className="roundedTwo">
          <input
            type="checkbox"
            value="None"
            id={`roundTwo${this.props.order.order_id}`}
            name="check"
            checked={this.getCheckedValue()}
            onChange={this.handleOnChange}
          />
          <label htmlFor={`roundTwo${this.props.order.order_id}`} />
        </div>
      </div>
    );
  };
  getCheckedValue = () => {
    if (parseInt(this.props.order.order_status_id) === 3) {
      return true;
    } else {
      return false;
    }
  };
  handleOnChange = e => {
    const { checked } = e.target;
    this.setState({ checked });
    console.log({ order_id: this.props.order.order_id });

    this.props.markingOrder(this.props.order.order_id, checked);
  };
  render() {
    const myStyle = this.getStyle();
    const user = this.props.order.user ? this.props.order.user : {};
    return (
      <div className="component-customer-order-card" onClick={this.selectOrder}>
        <div
          className="component-customer-order-card__tab"
          style={myStyle.orderCard_tab}
          onClick={e => e.stopPropagation()}
        >
          <span className="component-customer-order-card__tab__status-name">
            {this.props.order.status_name}
          </span>
          {this.getButton()}
        </div>
        <div
          className="component-customer-order-card__user-name"
          style={myStyle.orderCard_userName}
        >
          {this.getContent(user.username)}
        </div>
        <div className="component-customer-order-card__details">
          <div className="component-customer-order-card__pickup-info">
            <div className="component-customer-order-card__store-name">
              <span
                className="component-customer-order-card__store-name__title"
                style={myStyle.title}
              >
                取货店面
              </span>
              <span className="component-customer-order-card__store-name__value">
                {this.getContent(this.props.order.store_name)}
              </span>
            </div>
            <div className="component-customer-order-card__picked-date">
              <span
                className="component-customer-order-card__picked-date__title"
                style={myStyle.title}
              >
                取货日期
              </span>
              <span className="component-customer-order-card__picked-date__value">
                {this.getContent(this.props.order.fax)}
              </span>
            </div>
          </div>
          <div className="component-customer-order-card__payment-info">
            <div className="component-customer-order-card__payment-method">
              <span
                className="component-customer-order-card__payment-method__title"
                style={myStyle.title}
              >
                付款方式
              </span>
              <span className="component-customer-order-card__payment-method__value">
                {this.getContent(this.props.order.payment_method)}
              </span>
            </div>
            <div className="component-customer-order-card__total">
              <span
                className="component-customer-order-card__total__title"
                style={myStyle.title}
              >
                总计
              </span>
              <span className="component-customer-order-card__total__value">
                ${this.getContent(this.props.order.total)}
              </span>
            </div>
          </div>
        </div>
        {this.renderOrderItems()}
      </div>
    );
  }
}

export default connect(
  null,
  { selectOrder, markingOrder }
)(CustomerOrderCard);
