import React from "react";
import { connect } from "react-redux";

import { sortReportDetails } from "../../../../actions";
import { getStyle } from "./helper";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category_name: 0, quantity: 0, total: 0 };
  }
  sortByCategoryName = () => {
    const sortOrder = this.getSortOrder("category_name");
    this.props.sortReportDetails(
      "category_name",
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
      this.setState({ category_name: 0, quantity: 0, total: 0 });
      this.setState({ [value]: -1 });
      sortOrder = -1;
    } else {
      this.setState({ category_name: 0, quantity: 0, total: 0 });
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
          <th onClick={this.sortByCategoryName} className="text">
            <span>分类名称</span>
          </th>
          <th onClick={this.sortByTotal} className="number">
            <span>销售额</span>
          </th>
          <th onClick={this.sortByQuantity} className="number">
            <span>销售数量</span>
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
          const { category_name, total, quantity } = element;
          return (
            <tr key={`orderByCategoryRow${index}`} style={getStyle(index)}>
              <td className="text">{category_name}</td>
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
)(Category);
