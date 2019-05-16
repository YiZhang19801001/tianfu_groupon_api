import React from "react";
import { connect } from "react-redux";
import { fetchSingleShop, inactiveShop, activeShop } from "../../actions";
import { makeDate } from "../../helpers";
import moment from "moment";

const StoreCard = ({
  setMode,
  shop,
  fetchSingleShop,
  activeShop,
  inactiveShop
}) => {
  const { name, open, address, telephone, status, location_id } = shop;
  const selectShop = () => {
    setMode("update");
    fetchSingleShop(location_id);
  };
  const renderOpenDates = () => {
    return open.map(dateString => {
      return (
        <span key={`dateString${location_id}${dateString}`} className="date">
          {makeDate(dateString)}
        </span>
      );
    });
  };
  const renderOpenDateTime = () => {
    if (!open || open.length === 0) {
      return (
        <div>
          <span>尚未设置时间</span>
        </div>
      );
    }
    return open.map(date => {
      const { open_date, open_time, close_time } = date;
      return (
        <div>
          <span>{`${moment(open_date).format(
            "MMM DD"
          )}: ${open_time}--${close_time}`}</span>
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
      <div className="date-list">{renderOpenDateTime()}</div>

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
