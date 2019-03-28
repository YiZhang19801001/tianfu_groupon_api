import React from "react";
import { connect } from "react-redux";
import { getShops, setNewProdutStore } from "../actions";
class StoreSelector extends React.Component {
  componentDidMount() {
    this.props.getShops();
  }
  handleChange = e => {
    const location_id = e.target.value;
    this.props.setNewProdutStore(location_id);
  };

  renderOptions = () => {
    if (this.props.shops.length === 0) {
      return <option value="text_label">没有可选择的店铺</option>;
    }
    return (
      <>
        <option value="text_label">请选择可以生产该产品的店铺</option>
        {this.props.shops.map(shop => {
          return (
            <option
              key={`shopOption${shop.location_id}`}
              value={shop.location_id}
            >
              {shop.name}
            </option>
          );
        })}
      </>
    );
  };
  render() {
    const value = this.props.newProduct.location_id
      ? this.props.newProduct.location_id
      : "text_label";
    return (
      <select onChange={this.handleChange} value={value}>
        {this.renderOptions()}
      </select>
    );
  }
}

const mapStateToProps = ({ shops, newProduct }) => {
  return { shops, newProduct };
};

export default connect(
  mapStateToProps,
  { getShops, setNewProdutStore }
)(StoreSelector);
