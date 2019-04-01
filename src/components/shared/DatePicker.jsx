import React from "react";
import { connect } from "react-redux";

import { setGlobalStartDate, setGlobalEndDate } from "../../actions";
import { makeDateInputValue } from "../../helpers";

const DatePicker = ({
  startDate,
  endDate,
  setGlobalStartDate,
  setGlobalEndDate
}) => {
  console.log({ startDate: startDate, endDate });

  return (
    <div className="component-date-picker">
      <label>
        <span>起始日期</span>
        <input
          type="date"
          value={makeDateInputValue(startDate)}
          onChange={e => {
            setGlobalStartDate(e.target.value);
          }}
        />
      </label>
      <label>
        <span>截止日期</span>
        <input
          type="date"
          value={makeDateInputValue(endDate)}
          onChange={e => {
            setGlobalEndDate(e.target.value);
          }}
        />
      </label>
    </div>
  );
};

const mapStateToProps = ({ endDate, startDate }) => {
  return { endDate, startDate };
};

export default connect(
  mapStateToProps,
  { setGlobalStartDate, setGlobalEndDate }
)(DatePicker);
