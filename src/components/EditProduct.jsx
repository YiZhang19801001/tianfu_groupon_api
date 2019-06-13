import React from "react";
import { connect } from "react-redux";

import {
  getProduct,
  updateProduct,
  setProductImage,
  getShops
} from "../actions";
import ProductForm from "./ProductForm";

class EditProduct extends React.Component {
  componentDidMount() {
    if (!this.props.product.product_id) {
      const id = parseInt(this.props.match.params.product_id);
      this.props.getProduct(id);
      this.props.getShops();
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
          discounts={this.props.product.discounts}
          onSubmit={this.onSubmit}
          setSelectProductImage={this.props.setProductImage}
          image={this.props.product.product.image}
          shops={this.props.shops}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ product, shops }) => {
  return { product, shops };
};

export default connect(
  mapStateToProps,
  { getProduct, updateProduct, setProductImage, getShops }
)(EditProduct);
