import React from "react";
import { connect } from "react-redux";

import { fetchOrderProductsList } from "../../../actions";
// import TableView from "./TableView";
import Section from "./Section";

class Page extends React.Component {
  componentDidMount() {
    this.props.fetchOrderProductsList();
  }

  render() {
    if (this.props.orderProductsList.length === 0) {
      return <div className="component-productorders">loading...</div>;
    }
    return (
      <div className="component-productorders">
        {this.props.orderProductsList.map((orderProductArray, index) => {
          return (
            <Section orderProductArray={orderProductArray} index={index} />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ orderProductsList }) => {
  return { orderProductsList };
};
export default connect(
  mapStateToProps,
  { fetchOrderProductsList }
)(Page);
