import React from "react";
import { connect } from "react-redux";

import {
  getProduct,
  updateProduct,
  setProductImage,
  getShops,
  updateProductDiscount,
  createProductDiscount,
  removeProductDiscount,
  fetchSalesGroups
} from "../actions";
import ProductForm from "./ProductForm";

class EditProduct extends React.Component {
  componentDidMount() {
    if (!this.props.product.product_id) {
      const id = parseInt(this.props.match.params.product_id);
      // todo: change getSingeProduct api return object to avoid multiple api calls in same time
      this.props.getProduct(id);
      this.props.getShops();
      this.props.fetchSalesGroups();
    }
  }

  onSubmit = file => {
    const id = parseInt(this.props.match.params.product_id);
    this.props.updateProduct(id, file, true);
  };

  render() {
    if (!this.props.product.descriptions) {
      return <div>loading...</div>;
    }
    return (
      <div className="component-eidt-product">
        <div className="component-edit-product__title">编辑产品信息</div>
        <ProductForm
          initFormValues={{
            english_name: this.props.product.descriptions[0].name,
            chinese_name: this.props.product.descriptions[1].name,
            price: this.props.product.product.price,
            sort_order: this.props.product.product.sort_order,
            location_id: this.props.product.product.location
          }}
          product_id={this.props.product.product.product_id}
          discounts={this.props.product.discounts}
          onSubmit={this.onSubmit}
          setSelectProductImage={this.props.setProductImage}
          image={this.props.product.product.image}
          shops={this.props.shops}
          updateProductDiscount={this.props.updateProductDiscount}
          createProductDiscount={this.props.createProductDiscount}
          removeProductDiscount={this.props.removeProductDiscount}
          showDiscounts={true}
          salesGroupList={this.props.salesGroupsList}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ product, shops, salesGroupsList }) => {
  return { product, shops, salesGroupsList };
};

export default connect(
  mapStateToProps,
  {
    getProduct,
    updateProduct,
    setProductImage,
    getShops,
    updateProductDiscount,
    createProductDiscount,
    removeProductDiscount,
    fetchSalesGroups
  }
)(EditProduct);
