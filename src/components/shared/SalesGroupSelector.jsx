import React from "react";
import { connect } from "react-redux";
import {
  fetchSalesGroups,
  setPeriod,
  setSalesGroup,
  setSalesGroupId
} from "../../actions";
import DatePicker from "./DatePicker";
import { useSalesGroups } from "../hooks";
import kidsnParty from "../../apis/kidsnParty";
const SalesGroupSelector = ({
  fetchSalesGroups,
  setPeriod,
  salesGroupsList,
  salesGroup,
  setSalesGroup,
  setSalesGroupId
}) => {
  // !component did mount
  useSalesGroups(fetchSalesGroups);

  const handleOnChange = e => {
    setPeriod(e.target.value);
    setSalesGroupId(e.target.value);
    const payload = salesGroupsList.filter(
      x => x.sales_group_id === parseInt(e.target.value)
    )[0];
    setSalesGroup(payload);
  };
  const renderOptions = () => {
    if (salesGroupsList.length === 0) {
      return null;
    }
    return (
      <>
        <option value={"text_label"} disabled={true}>
          --请选择要查看的团--
        </option>
        {salesGroupsList.map(element => {
          return (
            <option
              key={`salesGroupSeletorOptions${element.sales_group_id}`}
              value={element.sales_group_id}
            >
              {element.name} from {element.start_date} to {element.end_date}
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
      <button
        className={`exportExcelButton`}
        onClick={e => {
          e.preventDefault();
          window.location.href = `http://kidsnparty.com.au/roben_api/groupon/public/api/excels?sales_group_id=${
            salesGroup.sales_group_id
            }`;
        }}
      >
        导出 {salesGroup.name} 统计表
      </button>
      <DatePicker />
    </div>
  );
};

const mapStateToProps = ({ salesGroupsList, salesGroup }) => {
  return { salesGroupsList, salesGroup };
};

export default connect(
  mapStateToProps,
  {
    fetchSalesGroups,
    setPeriod,
    setSalesGroup,
    setSalesGroupId
  }
)(SalesGroupSelector);
