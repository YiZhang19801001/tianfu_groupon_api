import React from "react";
import { connect } from "react-redux";

import { makeDate } from "../../../helpers";
import { updateOrderStatus } from "../../../actions";

class OrderDetail extends React.Component {
  getTheadColor = () => {
    switch (this.props.selectedOrder.status_id) {
      case 1:
        return `#ffba2d`;
      case 2:
        return `#f55747`;
      default:
        return `#a5a5a5`;
    }
  };
  /**
   *
   */
  renderList = () => {
    return (
      <tbody>
        {this.props.selectedOrder.order_items.map((orderItem, index) => {
          return (
            <tr key={`orderDetailOrderItem${index}`}>
              <td>{orderItem.name}</td>
              <td>{orderItem.price}</td>
              <td>{orderItem.quantity}</td>
              <td>{orderItem.total}</td>
              <td>{this.renderOrderItemOptions(orderItem.options)}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };
  /**
   *
   */
  renderOrderItemOptions = list => {
    if (list.length === 0) {
      return "无规格信息";
    } else {
      return list.map((optionValue, index) => {
        return (
          <p key={`optionsValue${index}`}>
            {optionValue.option_name} : {optionValue.option_value_name} -{" "}
            {optionValue.price}
          </p>
        );
      });
    }
  };
  /**
   * change order status - call action to change the status of order
   * @param {Void}
   * @return {Void}
   *
   */
  handleSelectInputChange = e => {
    const value = e.target[e.target.selectedIndex].value;
    this.props.updateOrderStatus(value);
  };
  /**
   * conditionally render component if selectedOrder is not empty render full list and head, else render a text info only
   *
   */
  renderComponent = () => {
    if (!this.props.selectedOrder.store_name) {
      return (
        <div className="component-order-detail">
          {"Select an order to see details"}
        </div>
      );
    }
    if (!this.props.selectedOrder.status) {
      return <div className="component-order-detail">{"loading..."}</div>;
    }
    return (
      <div className="component-order-detail">
        <div
          onClick={this.props.hiddenDetails}
          className="component-order-detail__close-button"
        >
          <i className="material-icons">close</i>
        </div>
        <div className="component-order-detail__header__field">
          <span>下单日期</span>
          <span>{makeDate(this.props.selectedOrder.create_date)}</span>
        </div>
        <div className="component-order-detail__header__field">
          <span>取货日期</span>
          <span>{makeDate(this.props.selectedOrder.picked_date)}</span>
        </div>
        <div className="component-order-detail__header__field">
          <span>取货地点</span>
          <span>{this.props.selectedOrder.store_name}</span>
        </div>
        <div className="component-order-detail__header__field">
          <span>付款方式</span>
          <span>{this.props.selectedOrder.payment_method}</span>
        </div>
        <div className="component-order-detail__header__field">
          <span>订单状态</span>
          <select
            value={this.props.selectedOrder.status_id}
            style={{ textTransform: `uppercase` }}
            onChange={this.handleSelectInputChange}
          >
            <option value="1">customer saved</option>
            <option value="2">pending</option>
            <option value="3">complete</option>
          </select>
        </div>

        <table>
          <thead style={{ backgroundColor: this.getTheadColor() }}>
            <tr>
              <td>名称</td>
              <td>单价</td>
              <td>数量</td>
              <td>小计</td>
              <td>规格</td>
            </tr>
          </thead>
          {this.renderList()}
        </table>
      </div>
    );
  };
  render() {
    return <React.Fragment>{this.renderComponent()}</React.Fragment>;
  }
}

const mapStateToProps = ({ selectedOrder }) => {
  return { selectedOrder };
};

export default connect(
  mapStateToProps,
  { updateOrderStatus }
)(OrderDetail);
