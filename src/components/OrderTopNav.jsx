import React from "react";
import { Link } from "react-router-dom";

const OrderTopNav = ({ location }) => {
  const getClass = value => {
    const path = location.pathname;
    if (value === path) {
      return "active";
    }
    return "";
  };

  return (
    <div className="component-order-top-nav">
      <Link
        className={getClass("/orders/products")}
        to={`${process.env.PUBLIC_URL}/orders/products`}
      >
        产品生产报表
      </Link>

      <Link
        className={getClass("/orders/stores")}
        to={`${process.env.PUBLIC_URL}/orders/stores`}
      >
        产品配送报表
      </Link>
      <Link
        className={getClass("/orders/customers")}
        to={`${process.env.PUBLIC_URL}/orders/customers`}
      >
        用户提货报表
      </Link>
    </div>
  );
};

export default OrderTopNav;
