import React from "react";
import { connect } from "react-redux";
import { setSalesGroup } from "../../actions";

const SalesGroupSelector = ({
  salesGroup,
  salesGroupsList,
  setSalesGroup,
  dispatch
}) => {
  return (
    <div className={`sales-group-selector-container`}>
      <select
        value={salesGroup.sales_group_id}
        onChange={e => {
          setSalesGroup(
            salesGroupsList.filter(
              element => element.sales_group_id === parseInt(e.target.value)
            )[0]
          );
        }}
        className={`select`}
      >
        {salesGroupsList.map((x, i) => {
          return (
            <option key={i} value={x.sales_group_id}>
              {x.name} : {x.start_date} ~ {x.end_date}
            </option>
          );
        })}
      </select>
      <button
        className={`button-large`}
        onClick={e => {
          e.preventDefault();
          dispatch({ type: "setState", payload: { showSalesGroup: true } });
        }}
      >
        编辑 / 创建 团
      </button>
    </div>
  );
};

const mapStateToProps = ({ salesGroup, salesGroupsList }) => {
  return { salesGroup, salesGroupsList };
};

export default connect(
  mapStateToProps,
  { setSalesGroup }
)(SalesGroupSelector);
