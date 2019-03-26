import React from "react";
import { connect } from "react-redux";

import { fetchOrderProductsList } from "../../../actions";
import TableView from "./TableView";

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
        {this.props.orderProductsList.map(orderProductArray => {
          return (
            <div
              className="section"
              key={`orderProductsArray${orderProductArray[0].location_id}`}
            >
              <TableView productsList={orderProductArray} />
            </div>
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
