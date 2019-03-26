import React from "react";

import { sorting } from "../../../helpers";
import { getStyle } from "../../shared/helper";

class TableView extends React.Component {
  state = {
    product_name: 0,
    quantity: 0,
    total: 0,
    list: [],
    showTable: false
  };

  componentDidMount() {
    this.setState({ list: this.props.productsList });
  }
  componentWillReceiveProps(newProps) {
    this.setState({ list: newProps.productsList });
  }
  sort = value => {
    const sortOrder = this.getSortOrder(value);
    const result = sorting(value, sortOrder, this.state.list);
    this.setState({ list: result });
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
          <th
            onClick={() => {
              this.sort("product_name");
            }}
            className="text"
          >
            <span>
              产品名
              <i className="material-icons">{this.getIcon("product_name")}</i>
            </span>
          </th>
          <th
            onClick={() => {
              this.sort("total");
            }}
            className="number"
          >
            <span>
              销售额<i className="material-icons">{this.getIcon("total")}</i>
            </span>
          </th>
          <th
            onClick={() => {
              this.sort("quantity");
            }}
            className="number"
          >
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
        {this.state.list.map(element => {
          index++;
          const { product_name, total, quantity } = element;
          return (
            <tr key={`orderByCategoryRow${index}`} style={getStyle(index)}>
              <td className="text">{product_name}</td>
              <td className="number">{total}</td>
              <td className="number">{quantity}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };
  render() {
    if (this.state.list.length === 0) {
      return <div className="component-detail-view-table">loading...</div>;
    }
    return (
      <div className="component-detail-view-table">
        <div
          className="header"
          onClick={() => {
            this.setState({ showTable: !this.state.showTable });
          }}
          style={
            this.state.showTable ? { borderBottom: `1px solid #a5a5a5` } : null
          }
        >
          <h2>{this.state.list[0].store_name}</h2>
          <i className="material-icons">
            {this.state.showTable ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </i>
        </div>
        {this.state.showTable ? (
          <table>
            {this.renderThead()}
            {this.renderTbody()}
          </table>
        ) : null}
      </div>
    );
  }
}

export default TableView;
