import React from "react";
import { Link } from "react-router-dom";

import { history } from "../history";

const LeftSideMenu = () => {
  const getClass = path => {
    const historyPath = history.location.pathname.substr(14);
    console.log({ string: history.location.pathname, substr: historyPath });

    const positionOfSecondSlash = historyPath.indexOf("/", 2);
    const compareString =
      positionOfSecondSlash === -1
        ? historyPath
        : historyPath.substring(0, positionOfSecondSlash);
    if (path === compareString) {
      return "component-left-side-menu__item active";
    } else {
      return "component-left-side-menu__item";
    }
  };
  return (
    <div className="component-left-side-menu">
      <div className="component-left-side-menu__icon">
        <img src="favicon.ico" alt="" />
      </div>
      <div className="component-left-side-menu__menu">
        <Link
          to={`${process.env.PUBLIC_URL}/orders`}
          className={getClass("/orders")}
        >
          <i className="material-icons">assignment</i>
          订单管理
        </Link>
        <Link
          to={`${process.env.PUBLIC_URL}/products`}
          className={getClass("/products")}
        >
          <i className="material-icons">fastfood</i>
          商品管理
        </Link>
        <Link
          to={`${process.env.PUBLIC_URL}/groupon`}
          className={getClass("/groupon")}
        >
          <i className="material-icons">store_mall_directory</i>
          团购管理
        </Link>
        <Link
          to={`${process.env.PUBLIC_URL}/charts`}
          className={getClass("/charts")}
        >
          <i className="material-icons">insert_chart_outlined</i>
          经营分析
        </Link>
        <Link
          to={`${process.env.PUBLIC_URL}/customer`}
          className={getClass("/customer")}
        >
          <i className="material-icons">supervisor_account</i>
          人员管理
        </Link>
      </div>
    </div>
  );
};

export default LeftSideMenu;
