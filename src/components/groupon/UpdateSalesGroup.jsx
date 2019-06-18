import React from "react";
import { connect } from "react-redux";

import SalesGroupForm from "./SalesGroupForm";

import { fetchSalesGroup, updateSalesGroup } from "../../actions";

class UpdateSalesGruop extends React.Component {
  constructor(props) {
    super(props);

    this.state = { salesGroupId: "text_label" };
  }

  onSubmit = () => {
    this.props.updateSalesGroup(this.state.salesGroupId);
  };
  handleSelectChange = e => {
    this.setState({ salesGroupId: e.target.value });
    this.props.fetchSalesGroup(e.target.value);
  };
  renderOptions = () => {
    if (this.props.salesGroupsList.length === 0) {
      return <option value="0">{`没有可选团`}</option>;
    }
    return (
      <>
        <option value="text_label" disabled={true}>
          --请选择--
        </option>
        {this.props.salesGroupsList.map(element => {
          const { sales_group_id, name } = element;
          return (
            <option
              key={`salesGroupsListDropDown${sales_group_id}`}
              value={sales_group_id}
            >
              {name}
            </option>
          );
        })}
      </>
    );
  };
  render() {
    return (
      <div className="sale-group">
        <select
          value={this.state.salesGroupId}
          onChange={this.handleSelectChange}
        >
          {this.renderOptions()}
        </select>
        <SalesGroupForm
          salesGroup={this.props.salesGroup}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ salesGroupsList, salesGroup }) => {
  return { salesGroupsList, salesGroup };
};

export default connect(
  mapStateToProps,
  { fetchSalesGroup, updateSalesGroup }
)(UpdateSalesGruop);
