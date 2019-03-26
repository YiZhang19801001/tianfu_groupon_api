import React from "react";
import { connect } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { history } from "../history.js";

import { getProducts } from "../actions";

import { ProductOrderList, CustomerOrderList } from "./orders/";
import StoreOrderList from "./StoreOrderList";
import OrderTopNav from "./OrderTopNav";
import { SalesGroupSelector } from "./shared/";

class OrderManageMainWindow extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
      <div className="component-order-manange-main-window">
        <SalesGroupSelector />

        <Router history={history}>
          <React.Fragment>
            <OrderTopNav {...this.props} />
            <div className="main-window">
              <Switch>
                <Route
                  path={`${process.env.PUBLIC_URL}/orders/products`}
                  component={ProductOrderList}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/orders/customers`}
                  component={CustomerOrderList}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/orders/stores`}
                  component={StoreOrderList}
                />
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/orders/`}
                  component={ProductOrderList}
                />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = ({ products }) => {
  return { products };
};
export default connect(
  mapStateToProps,
  { getProducts }
)(OrderManageMainWindow);
