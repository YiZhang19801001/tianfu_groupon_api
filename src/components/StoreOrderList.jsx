import React from "react";
import { connect } from "react-redux";

import { fetchOrdersByStore } from "../actions";

import { getStyle } from "../helpers";
class StoreOrderList extends React.Component {
  componentDidMount() {
    this.props.fetchOrdersByStore();
  }
  renderStoreOrders = element => {
    return (
      <div
        key={`storeSection${element.store_id}`}
        className="component-store-order-list__store"
      >
        <div className="component-store-order-list__store__header">
          <span>{element.store_name}</span>
        </div>
        <div className="component-store-order-list__store__product-list">
          {this.renderStoreOrderProducts(element.order_products)}
        </div>
      </div>
    );
  };
  renderStoreOrderProducts = list => {
    if (list === {}) {
      return <p>本店今天没有订单</p>;
    }


    const arrayOfList = Object.keys(list).map(key=>{
      return {date:key,products:list[key].reduce((resArr,x)=>{
        if(resArr.find(y=>y.product_id===x.product_id) === undefined){
          return [...resArr,x];
        }else{
          return resArr.map(z=>{
            if(z.product_id === x.product_id){
              return {...z,quantity:z.quantity + x.quantity};
            }else{
              return z;
            }
          })
        }
      },[])};

    })

    
    
    return arrayOfList.map((newListItem ,idx)=> {
      return (
        <div key={`newListItem${idx}`}>
        <div style={{marginTop:'0.5rem'}}>{newListItem.date}</div>
          {newListItem.products.map((ele,i)=>{
            return <div
            className="component-store-order-list__store__product-list__product-card"
            key={`storeOrderProduct${i}`}
          >
            <p>
              <span className="name">{ele.name}</span>
              <span>{ele.price}</span>
              <span className="quantity">
                x{ele.quantity}
              </span>
            </p>
          </div>
          })}
        </div>
      );
    });
  };
  calculateTotalQuantity = list => {
    let sum = 0;
    list.map(item => {
      const { quantity } = item;
      sum += parseInt(quantity);
    });
    return sum;
  };
  renderProductItems = list => {
    if (list.length === 0) {
      return null;
    }
    let index = 0;
    return (
      <table>
        <thead>
          <tr>
            <th className="text">
              <span>用户名</span>
            </th>
            <th className="number">
              <span>订货数量</span>
            </th>
            <th className="number">
              <span>取货时间</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map(product => {
            index++;
            const { product_name, date, username, quantity } = product;
            return (
              <tr
                key={`product${product_name}${date}${username}`}
                style={getStyle(index)}
              >
                <td className="text">{username}</td>

                <td className="number">{quantity}</td>

                <td className="number">{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  render() {
    return (
      <div className="component-store-order-list">
        {this.props.ordersByStore.map(element => {
          return this.renderStoreOrders(element);
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ ordersByStore }) => {
  return { ordersByStore };
};

export default connect(
  mapStateToProps,
  { fetchOrdersByStore }
)(StoreOrderList);
