import React from "react";
import { connect } from "react-redux";

import { fetchSalesGroups } from "../../actions";
import CreateSalesGroup from "./CreateSalesGroup";
import UpdateSalesGroup from "./UpdateSalesGroup";

class SalesGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = { mode: "create" };
  }

  componentDidMount() {
    this.props.fetchSalesGroups();
  }

  render() {
    return (
      <div className="sales-group">
        <div className="tab">
          <span
            onClick={() => {
              this.setState({ mode: "create" });
            }}
            className={this.state.mode === "create" ? `active` : ""}
          >
            创建新团
          </span>
          <span
            onClick={() => {
              this.setState({ mode: "update" });
            }}
            className={this.state.mode === "update" ? `active` : ""}
          >
            修改已建团
          </span>
        </div>
        {this.state.mode === "create" ? (
          <CreateSalesGroup />
        ) : (
          <UpdateSalesGroup />
        )}
        <div
          onClick={() => {
            this.props.dispatch({
              type: "setState",
              payload: { showSalesGroup: false }
            });
          }}
          className={`close-section`}
        >
          <i className="material-icons">keyboard_arrow_up</i>
          <span>收起</span> <i className="material-icons">keyboard_arrow_up</i>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchSalesGroups }
)(SalesGroup);
