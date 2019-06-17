import React from "react";
import { Link } from "react-router-dom";

const OrderTopNav = ({ location }) => {
  const path = location.pathname;
  const getClass = value => {
    if (value === path) {
      return "active";
    }
    return "";
  };

  return (
    <div className="component-order-top-nav">
      <Link
        className={
          path === "/orders/products" || path === "/orders" ? "active" : ""
        }
        to={`${process.env.PUBLIC_URL}/orders/products`}
      >
        产品统计
      </Link>

      <Link
        className={getClass("/orders/stores")}
        to={`${process.env.PUBLIC_URL}/orders/stores`}
      >
        取货时间地点统计
      </Link>
      <Link
        className={getClass("/orders/customers")}
        to={`${process.env.PUBLIC_URL}/orders/customers`}
      >
        订单统计
      </Link>
    </div>
  );
};

export default OrderTopNav;
