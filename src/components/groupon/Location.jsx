import React from "react";
import { connect } from "react-redux";
import { getShopsBySalesGroupId, setLocationPageLayout } from "../../actions";
import StoreList from "./StoreList";
import LinkNewStore from "./LinkNewStore";

const Location = ({
  salesGroup,
  getShopsBySalesGroupId,
  shops,
  locationPageLayout
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
        />
      );
    case "linkNew":
      return <LinkNewStore />;
    default:
      return <div>loading...</div>;
  }
};

const mapStateToProps = ({ salesGroup, shops, locationPageLayout }) => {
  return { salesGroup, shops, locationPageLayout };
};

export default connect(
  mapStateToProps,
  { getShopsBySalesGroupId, setLocationPageLayout }
)(Location);
