import React from "react";
import { connect } from "react-redux";
import {
  getShops,
  fetchSingleShop,
  createShop,
  setShopsLayout,
  updateShop
} from "../../actions";
import { ShopList, CreateShop, UpdateShop } from "./components";
class ShopsManagement extends React.PureComponent {
  componentDidMount() {
    this.props.getShops();
  }

  renderComponents = () => {
    const { path } = this.props.shopsLayout;
    switch (path) {
      case "list":
        return (
          <ShopList
            shops={this.props.shops}
            fetchShop={this.props.fetchSingleShop}
            setShopsLayout={this.props.setShopsLayout}
          />
        );
      case "create":
        return (
          <CreateShop
            onSubmit={this.props.createShop}
            setShopsLayout={this.props.setShopsLayout}
          />
        );
      case "update":
        return (
          <UpdateShop
            selectedShop={this.props.selectedShop}
            onSubmit={this.props.updateShop}
            setShopsLayout={this.props.setShopsLayout}
          />
        );
      default:
        return (
          <ShopList
            shops={this.props.shops}
            fetchShop={this.props.fetchSingleShop}
            setShopsLayout={this.props.setShopsLayout}
          />
        );
    }
  };
  render() {
    return <div className={"shops"}>{this.renderComponents()}</div>;
  }
}

const mapStateToProps = ({ shopsLayout, shops, selectedShop }) => {
  return { shopsLayout, shops, selectedShop };
};

export default connect(
  mapStateToProps,
  { getShops, fetchSingleShop, createShop, setShopsLayout, updateShop }
)(ShopsManagement);
