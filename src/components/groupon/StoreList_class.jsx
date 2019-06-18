import React from "react";
import StoreCard from "./StoreCard";
import { connect } from "react-redux";
import { getShops, fetchSingleShop } from "../../actions";
class StoreList extends React.Component {
  componentDidMount() {
    this.props.getShops();
  }
  render() {
    return (
      <div className="store-list" style={this.props.style}>
        {this.props.shops.map((shop, index) => {
          return (
            <StoreCard
              setMode={this.props.setMode}
              key={`shop${index}`}
              shop={shop}
            />
          );
        })}
        <div
          onClick={() => {
            this.props.setMode("create");
          }}
          className="add-button"
        >
          <i className="material-icons">add</i>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ shops }) => {
  return { shops };
};
export default connect(
  mapStateToProps,
  { getShops, fetchSingleShop }
)(StoreList);
