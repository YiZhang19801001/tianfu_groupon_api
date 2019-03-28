import React from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";

import {
  getOrders,
  onCustomerOrderListPageChange,
  searchingOrders,
  advSearchingOrders
} from "../../../actions";
import CustomerOrderCard from "./CustomerOrderCard";
import OrderDetail from "./OrderDetail";

class CustomerOrderList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showDetails: false };
  }
  componentDidMount() {
    this.props.getOrders();
  }
  handlePageChange = pageNumber => {
    this.props.onCustomerOrderListPageChange(pageNumber);
  };
  showDetails = () => {
    this.setState({ showDetails: true });
  };

  hiddenDetails = () => {
    this.setState({ showDetails: false });
  };
  getClass = () => {
    if (this.state.showDetails) {
      return "component-customer-order-list__with-details";
    }
    return "component-customer-order-list__without-details";
  };
  renderThead = () => {
    return (
      <thead>
        <tr>
          <th className="placeholder">
            <span />
          </th>
          <th className="text">
            <span>订单号</span>
          </th>
          <th className="text">
            <span>取货人</span>
          </th>
          <th className="text">
            <span>取货时间</span>
          </th>
          <th className="text">
            <span>产品明细</span>
          </th>
          <th className="text">
            <span>订单状态</span>
          </th>
          <th className="number">
            <span>订单总件数</span>
          </th>
        </tr>
      </thead>
    );
  };
  render() {
    if (!this.props.paginationParams) {
      return <div className={this.getClass()}>loading...</div>;
    }
    let index = 0;
    return (
      <React.Fragment>
        <div className={this.getClass()}>
          <div className="component-customer-order-list__pagination__container">
            <input
              type="text"
              onChange={e => {
                this.props.searchingOrders(e.target.value);
              }}
              placeholder={"按姓氏,电话号码,invoice No.搜索"}
            />
            <input
              type="text"
              onChange={e => {
                this.props.advSearchingOrders(e.target.value);
              }}
              placeholder={"按订单中的商品名搜索,速度慢,慎用"}
            />
            <Pagination
              activePage={this.props.paginationParams.current_page}
              itemsCountPerPage={this.props.paginationParams.per_page}
              totalItemsCount={this.props.paginationParams.total}
              pageRangeDisplayed={5}
              prevPageText={null}
              nextPageText={null}
              lastPageText={<i className="material-icons">fast_forward</i>}
              firstPageText={<i className="material-icons">fast_rewind</i>}
              onChange={this.handlePageChange}
              itemClass="page-item"
              linkClass="link-item"
              linkClassFirst="first-page-button"
              linkClassLast="last-page-button"
              activeLinkClass="link-item-active"
            />
          </div>
          <div className="component-detail-view-table">
            <table>
              {this.renderThead()}
              <tbody>
                {this.props.orders.map(order => {
                  index++;
                  return (
                    <CustomerOrderCard
                      showDetails={this.showDetails}
                      key={`customerOrder${index}`}
                      index={index}
                      order={order}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {this.state.showDetails ? (
          <OrderDetail hiddenDetails={this.hiddenDetails} />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ orders, paginationParams }) => {
  return { orders, paginationParams };
};

export default connect(
  mapStateToProps,
  {
    getOrders,
    onCustomerOrderListPageChange,
    searchingOrders,
    advSearchingOrders
  }
)(CustomerOrderList);
