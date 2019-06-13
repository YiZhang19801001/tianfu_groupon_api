import React from "react";
import { connect } from "react-redux";

import {
  getProduct,
  createNewProduct,
  setProductImage,
  getShops
} from "../actions";
import ProductForm from "./ProductForm";

class CreateProduct extends React.Component {
  onSubmit = file => {
    this.props.createNewProduct(file, true);
  };

  componentDidMount() {
    this.props.getShops();
  }
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
            sort_order: 1,
            location_id: "text_label"
          }}
          setSelectProductImage={this.props.setProductImage}
          image={this.props.product.image}
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
  { getProduct, createNewProduct, setProductImage, getShops }
)(CreateProduct);
