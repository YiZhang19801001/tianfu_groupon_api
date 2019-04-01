import React from "react";
import { connect } from "react-redux";

import { sortReportDetails } from "../../../../actions";
import { getStyle } from "./helper";

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { customer_id: 0, username: 0, quantity: 0, total: 0 };
  }

  sortByCustomerId = () => {
    const sortOrder = this.getSortOrder("customer_id");
    this.props.sortReportDetails(
      "customer_id",
      sortOrder,
      this.props.reportDetails
    );
  };
  sortByUsername = () => {
    const sortOrder = this.getSortOrder("username");
    this.props.sortReportDetails(
      "username",
      sortOrder,
      this.props.reportDetails
    );
  };
  sortByTotal = () => {
    const sortOrder = this.getSortOrder("total");
    this.props.sortReportDetails("total", sortOrder, this.props.reportDetails);
  };
  sortByQuantity = () => {
    const sortOrder = this.getSortOrder("quantity");
    this.props.sortReportDetails(
      "quantity",
      sortOrder,
      this.props.reportDetails
    );
  };
  getSortOrder = value => {
    let sortOrder = 0;
    if (this.state[value] === 1) {
      this.setState({ customer_id: 0, username: 0, quantity: 0, total: 0 });
      this.setState({ [value]: -1 });
      sortOrder = -1;
    } else {
      this.setState({ customer_id: 0, username: 0, quantity: 0, total: 0 });

      this.setState({ [value]: 1 });
      sortOrder = 1;
    }
    return sortOrder;
  };
  getIcon = value => {
    switch (this.state[value]) {
      case 0:
        return "remove";
      case 1:
        return "arrow_upward";
      case -1:
        return "arrow_downward";
      default:
        return null;
    }
  };
  renderThead = () => {
    return (
      <thead>
        <tr>
          <th onClick={this.sortByCustomerId} className="text">
            <span>
              用户编号
              <i className="material-icons">{this.getIcon("customer_id")}</i>
            </span>
          </th>
          <th onClick={this.sortByUsername} className="text">
            <span>
              用户账号名
              <i className="material-icons">{this.getIcon("username")}</i>
            </span>
          </th>
          <th onClick={this.sortByTotal} className="number">
            <span>
              订单总金额
              <i className="material-icons">{this.getIcon("total")}</i>
            </span>
          </th>
          <th onClick={this.sortByQuantity} className="number">
            <span>
              订单数量
              <i className="material-icons">{this.getIcon("quantity")}</i>
            </span>
          </th>
        </tr>
      </thead>
    );
  };
  renderTbody = () => {
    let index = 0;
    return (
      <tbody>
        {this.props.reportDetails.map(element => {
          index++;
          const { customer_id, username, total, quantity } = element;
          return (
            <tr key={`orderByCategoryRow${index}`} style={getStyle(index)}>
              <td className="text">{customer_id}</td>
              <td className="text">{username}</td>
              <td className="number">{total}</td>
              <td className="number">{quantity}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };
  render() {
    return (
      <div className="component-detail-view-table">
        <table>
          {this.renderThead()}
          {this.renderTbody()}
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ reportDetails }) => {
  return { reportDetails };
};

export default connect(
  mapStateToProps,
  { sortReportDetails }
)(Customer);
