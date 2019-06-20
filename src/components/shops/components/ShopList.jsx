import React from "react";
import { uniqueId } from "lodash";

const ShopList = ({ shops, fetchShop, setShopsLayout }) => {
  return (
    <div className={`shop-list`}>
      {shops.map(shop => {
        const { name, telephone, address, location_id } = shop;
        console.log("shops/shopList", { shop });
        return (
          <div key={uniqueId(`shop`)} className={`shop-card`}>
            <div className={`content`}>
              <div className={`row`}>
                <div className={`title`}>店名</div>
                <div className={`content`}>{name}</div>
              </div>
              <div className={`row`}>
                <div className={`title`}>电话</div>
                <div className={`content`}>{telephone}</div>
              </div>
              <div className={`row`}>
                <div className={`title`}>地址</div>
                <div className={`content`}>{address}</div>
              </div>
            </div>
            <div className={`button-container`}>
              <button
                className={`button-edit`}
                onClick={e => {
                  e.preventDefault();
                  fetchShop(location_id);
                  setShopsLayout({ path: "update" });
                }}
              >
                EDIT
              </button>
            </div>
          </div>
        );
      })}
      <div className={`button-container`}>
        <button
          className={"button-add"}
          onClick={e => {
            e.preventDefault();
            setShopsLayout({ path: "create" });
          }}
        >
          添加新的店铺
        </button>
      </div>
    </div>
  );
};

export default ShopList;
