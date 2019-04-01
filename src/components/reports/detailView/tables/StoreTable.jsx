import React from "react";
import { connect } from "react-redux";

import { sortReportDetails } from "../../../../actions";
import { getStyle } from "./helper";
class StoreTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { store_name: 0, quantity: 0, total: 0 };
  }
  sortByStoreName = () => {
    const sortOrder = this.getSortOrder("store_name");
    this.props.sortReportDetails(
      "store_name",
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
      this.setState({ store_name: 0, quantity: 0, total: 0 });
      this.setState({ [value]: -1 });
      sortOrder = -1;
    } else {
      this.setState({ store_name: 0, quantity: 0, total: 0 });

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
          <th onClick={this.sortByStoreName} className="text">
            <span>
              店铺名
              <i className="material-icons">{this.getIcon("store_name")}</i>
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
          const { store_name, total, quantity } = element;
          return (
            <tr key={`orderByCategoryRow${index}`} style={getStyle(index)}>
              <td className="text">{store_name}</td>
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
)(StoreTable);
