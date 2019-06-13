import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import ProductList from "./ProductsList";
import EditProduct from "./EditProduct";
import CreateProduct from "./CreateProduct";
import { history } from "../history";
import { connect } from "react-redux";
import { getProducts, searchByName } from "../actions";

class ProductManageMainWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product_status: 0,
      className: { activeProduct: "active", inactiveProduct: "" }
    };
  }
  componentDidMount() {
    this.props.getProducts(this.state.product_status);
    console.log("props of ProductManageMainWindow", this.props);
  }
  changeProductStatus = e => {
    const content = e.target.innerText;
    if (content === "已上架商品") {
      this.props.getProducts(0);
      this.setState({
        className: { activeProduct: "active", inactiveProduct: "" }
      });
    } else {
      this.props.getProducts(1);
      this.setState({
        className: { activeProduct: "", inactiveProduct: "active" }
      });
    }
  };

  getLinkClassName = value => {
    return value === this.state.product_status ? "active" : "";
  };

  handleInputChange = e => {
    const value = e.target.value;
    this.props.searchByName(value, this.state.product_status);
  };

  render() {
    return (
      <div className="product-manage-main-window">
        <Router history={history}>
          <React.Fragment>
            <div className="sub-menu">
              <div className="input-container">
                <input
                  type="text"
                  onChange={this.handleInputChange}
                  placeholder="按商品名搜索"
                />
              </div>
              <div className="link-container">
                <span
                  onClick={this.changeProductStatus}
                  className={this.state.className.activeProduct}
                >
                  已上架商品
                </span>
                <span
                  onClick={this.changeProductStatus}
                  className={this.state.className.inactiveProduct}
                >
                  未上架商品
                </span>
              </div>
              <div className="button-container">
                <button
                  onClick={() => {
                    history.push(`${process.env.PUBLIC_URL}/products/create`);
                  }}
                >
                  新建商品
                </button>
              </div>
            </div>
            <div style={{ display: `flex` }}>
              <ProductList />
              <Switch>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/products/edit/:product_id`}
                  component={EditProduct}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/products/create`}
                  component={CreateProduct}
                />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default connect(
  null,
  { getProducts, searchByName }
)(ProductManageMainWindow);
