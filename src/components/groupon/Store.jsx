import React from "react";
import { connect } from "react-redux";
import StoreList from "./StoreList";
import CreateStore from "./CreateStore";
import UpdateStore from "./UpdateStore";

import { fetchSalesGroups } from "../../actions";

class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = { mode: "none" };
  }
  componentDidMount() {
    this.props.fetchSalesGroups();
  }
  setMode = value => {
    this.setState({ mode: value });
  };
  renderForm = () => {
    switch (this.state.mode) {
      case "none":
        return null;
      case "create":
        return <CreateStore setMode={this.setMode} />;
      case "update":
        return <UpdateStore setMode={this.setMode} />;
    }
  };
  render() {
    return (
      <div className="store">
        <StoreList
          setMode={this.setMode}
          style={
            this.state.mode === "none" ? { width: `100%` } : { width: `50%` }
          }
        />
        {this.renderForm()}
      </div>
    );
  }
}

export default connect(
  null,
  { fetchSalesGroups }
)(Store);
