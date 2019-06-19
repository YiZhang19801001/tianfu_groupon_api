import React, { useEffect } from "react";
import { uniqueId } from "lodash";
import StoreListItem from "./StoreListItem";

const StoreList = ({
  shops,
  getShops,
  salesGroup,
  updatePickupDate,
  setLocationPageLayout,
  deletePickupDate
}) => {
  const { sales_group_id } = salesGroup;
  useEffect(() => {
    getShops(sales_group_id);
  }, [sales_group_id]);

  return (
    <div className={`store-list-container`}>
      <div className={`title`}>已关联的店铺</div>
      <div className={`store-list`}>
        {shops.map(shop => {
          return (
            <StoreListItem
              updatePickupDate={updatePickupDate}
              key={uniqueId()}
              shop={shop}
              deletePickupDate={deletePickupDate}
            />
          );
        })}
      </div>
      <div className={`button-container`}>
        <button
          onClick={e => {
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
