import React from "react";
import { connect } from "react-redux";

import { sortReportDetails } from "../../../../actions";
import { getStyle } from "./helper";

import { makeDate } from "../../../../helpers";

class DateTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: 0, quantity: 0, total: 0 };
  }
  sortByDate = () => {
    const sortOrder = this.getSortOrder("date");
    this.props.sortReportDetails("date", sortOrder, this.props.reportDetails);
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
      this.setState({ date: 0, quantity: 0, total: 0 });
      this.setState({ [value]: -1 });
      sortOrder = -1;
    } else {
      this.setState({ date: 0, quantity: 0, total: 0 });

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
          <th onClick={this.sortByDate} className="text">
            <span>
              日期<i className="material-icons">{this.getIcon("date")}</i>
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
          const { date, total, quantity } = element;
          return (
            <tr key={`orderByCategoryRow${index}`} style={getStyle(index)}>
              <td className="text">{makeDate(date)}</td>
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
)(DateTable);
