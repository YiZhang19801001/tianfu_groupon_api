import React from "react";
import { connect } from "react-redux";
import { fetchSalesGroups, setPeriod } from "../../actions";
import DatePicker from "./DatePicker";
import { useSalesGroups } from "../hooks";
const SalesGroupSelector = ({
  fetchSalesGroups,
  setPeriod,
  salesGroupsList,
  salesGroup
}) => {
  // !component did mount
  useSalesGroups(fetchSalesGroups);

  const handleOnChange = e => {
    setPeriod(e.target.value);
  };
  const renderOptions = () => {
    if (salesGroupsList.length === 0) {
      return null;
    }
    return (
      <>
        <option value="text_label" disabled={true}>
          --请选择要查看的团--
        </option>
        {salesGroupsList.map(element => {
          return (
            <option
              key={`salesGroupSeletorOptions${element.sales_group_id}`}
              value={element.sales_group_id}
            >
              {element.name}
            </option>
          );
        })}
      </>
    );
  };

  // !screen code
  return (
    <div className="component-sales-group-selector">
      <select onChange={handleOnChange} value={salesGroup.sales_group_id}>
        {renderOptions()}
      </select>
      <DatePicker />
    </div>
  );
};

const mapStateToProps = ({ salesGroupsList, salesGroup }) => {
  return { salesGroupsList, salesGroup };
};

export default connect(
  mapStateToProps,
  { fetchSalesGroups, setPeriod }
)(SalesGroupSelector);
