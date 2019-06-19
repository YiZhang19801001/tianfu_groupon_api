import React from "react";
import { connect } from "react-redux";
import {
  getShopsBySalesGroupId,
  setLocationPageLayout,
  createPickupDate,
  updatePickupDate,
  deletePickupDate
} from "../../actions";
import StoreList from "./StoreList";
import LinkNewStore from "./LinkNewStore";

const Location = ({
  salesGroup,
  getShopsBySalesGroupId,
  shops,
  locationPageLayout,
  setLocationPageLayout,
  allShops,
  createPickupDate,
  updatePickupDate,
  deletePickupDate
}) => {
  switch (locationPageLayout.mode) {
    case "showList":
      return (
        <StoreList
          salesGroup={salesGroup}
          getShops={getShopsBySalesGroupId}
          shops={shops}
          locationPageLayout={locationPageLayout}
          setLocationPageLayout={setLocationPageLayout}
          updatePickupDate={updatePickupDate}
          deletePickupDate={deletePickupDate}
        />
      );
    case "linkNew":
      return (
        <LinkNewStore
          salesGroup={salesGroup}
          shops={allShops}
          createPickupDate={createPickupDate}
          setLocationPageLayout={setLocationPageLayout}
        />
      );
    default:
      return <div>loading...</div>;
  }
};

const mapStateToProps = ({
  salesGroup,
  shops,
  locationPageLayout,
  allShops
}) => {
  return { salesGroup, shops, locationPageLayout, allShops };
};

export default connect(
  mapStateToProps,
  {
    getShopsBySalesGroupId,
    setLocationPageLayout,
    createPickupDate,
    updatePickupDate,
    deletePickupDate
  }
)(Location);
