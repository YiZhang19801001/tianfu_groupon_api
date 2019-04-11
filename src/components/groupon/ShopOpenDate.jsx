import React from "react";
import { connect } from "react-redux";
import { makeDate } from "../../helpers";
import { handleDismissDate } from "../../actions";

const Shop = ({ date, handleDismissDate }) => {
  const { open_date, open_time, close_time } = date;
  return (
    <span className="tag-container">
      <span className="open-date-tags">
        {makeDate(open_date)}: {open_time} -- {close_time}
      </span>
      <span
        className="tag-dismiss"
        onClick={() => {
          handleDismissDate(date);
        }}
      >
        <i className="material-icons">clear</i>
      </span>
    </span>
  );
};

export default connect(
  null,
  { handleDismissDate }
)(Shop);
