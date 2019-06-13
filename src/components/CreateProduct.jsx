import React from "react";
import { connect } from "react-redux";

import { getProduct, createNewProduct, setProductImage } from "../actions";
import ProductForm from "./ProductForm";

class CreateProduct extends React.Component {
  onSubmit = (file, isGroupon) => {
    this.props.createNewProduct(file, isGroupon);
  };
  render() {
    return (
      <div className="component-create-product">
        <div className="component-create-product__title">添加新产品</div>
        <ProductForm
          onSubmit={this.onSubmit}
          initFormValues={{
            english_name: "",
            chinese_name: "",
            price: 0,
            sort_order: 1
          }}
          setSelectProductImage={this.props.setProductImage}
          image={this.props.product.image}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ product }) => {
  return { product };
};

export default connect(
  mapStateToProps,
  { getProduct, createNewProduct, setProductImage }
)(CreateProduct);
