import React from "react";
import { connect } from "react-redux";
import { fetchSingleShop, inactiveShop, activeShop } from "../../actions";
import moment from "moment";
import { uniqueId } from "lodash";

const StoreCard = ({
  setMode,
  shop,
  fetchSingleShop,
  activeShop,
  inactiveShop
}) => {
  const { name, pickup_date, address, telephone, status, location_id } = shop;
  const selectShop = () => {
    setMode("update");
    fetchSingleShop(location_id);
  };

  const renderOpenDates = () => {
    if (!pickup_date || pickup_date.length === 0) {
      return (
        <div>
          <span>尚未设置时间</span>
        </div>
      );
    }
    return pickup_date.map(pickupDate => {
      const { date } = pickupDate;
      return (
        <div key={uniqueId()}>
          <span>{moment(date).format("MMM Do")}</span>
        </div>
      );
    });
  };
  const switchShopStatus = () => {
    if (parseInt(status) === 1) {
      activeShop(location_id);
    } else {
      inactiveShop(location_id);
    }
  };
  return (
    <div className="store-card">
      <div className="information">
        <div className="text">
          {`店名：`}
          {name}
        </div>
        <div className="text">
          {`地址：`}
          {address}
        </div>
        <div className="text">
          {`电话：`}
          {telephone}
        </div>
      </div>
      <div className="date-list">{renderOpenDates()}</div>

      <div className="control-panel">
        <i className="material-icons" onClick={switchShopStatus}>
          {parseInt(status) === 1 ? `done` : `clear`}
        </i>
        <i className="material-icons" onClick={selectShop}>
          edit
        </i>
      </div>
    </div>
  );
};

export default connect(
  null,
  { fetchSingleShop, inactiveShop, activeShop }
)(StoreCard);
