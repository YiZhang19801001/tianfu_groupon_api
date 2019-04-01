import React from "react";
import { connect } from "react-redux";

import { sortReportDetails } from "../../../../actions";
import { getStyle } from "./helper";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product_name: 0, quantity: 0, total: 0 };
  }
  sortByProductName = () => {
    const sortOrder = this.getSortOrder("product_name");
    this.props.sortReportDetails(
      "product_name",
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
      this.setState({ product_name: 0, quantity: 0, total: 0 });
      this.setState({ [value]: -1 });
      sortOrder = -1;
    } else {
      this.setState({ product_name: 0, quantity: 0, total: 0 });

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
          <th onClick={this.sortByProductName} className="text">
            <span>
              产品名
              <i className="material-icons">{this.getIcon("product_name")}</i>
            </span>
          </th>
          <th onClick={this.stortByPrice} className="number">
            <span>
              产品单价
              <i className="material-icons">{this.getIcon("price")}</i>
            </span>
          </th>
          <th onClick={this.sortByTotal} className="number">
            <span>
              销售额<i className="material-icons">{this.getIcon("total")}</i>
            </span>
          </th>
          <th onClick={this.sortByQuantity} className="number">
            <span>
              销售数量
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
          const { product_name, total, quantity, price } = element;
          return (
            <tr key={`orderByCategoryRow${index}`} style={getStyle(index)}>
              <td className="text">{product_name}</td>
              <td className="number">{price}</td>
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
)(Product);
