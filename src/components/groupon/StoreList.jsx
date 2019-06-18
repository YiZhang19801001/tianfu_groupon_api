import React, { useEffect } from "react";
import { uniqueId } from "lodash";

const StoreList = ({ shops, getShops, salesGroup, setLocationPageLayout }) => {
  const { sales_group_id } = salesGroup;
  useEffect(() => {
    getShops(sales_group_id);
  }, [sales_group_id]);

  return (
    <div className={`store-list-container`}>
      <div className={`title`}>已关联的店铺</div>
      <div className={`store-list`}>
        {shops.map(shop => {
          return <div key={uniqueId()}>{shop.name}</div>;
        })}
      </div>
      <div className={`button-container`}>
        <button
          onClick={e => {
            e.preventDefault();
            setLocationPageLayout({ mode: "linkNew" });
          }}
        >
          关联新的店铺
        </button>
      </div>
    </div>
  );
};

export default StoreList;
