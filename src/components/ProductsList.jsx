import React from "react";
import { uniqueId } from "lodash";
import { connect } from "react-redux";

import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  if (!products) {
    return <div className="product-list">Loading...</div>;
  }

  return (
    <div className="product-list">
      {products.map(productGroup => {
        return (
          <div className="item" key={uniqueId("product-group")}>
            {productGroup.products.map(product => {
              return (
                <ProductCard key={uniqueId("product-card")} product={product} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ products }) => {
  return { products };
};

export default connect(mapStateToProps)(ProductList);
