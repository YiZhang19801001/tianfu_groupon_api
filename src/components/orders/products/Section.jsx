import React, { useState } from "react";
import { Table } from "../../shared";

export default ({ orderProductArray, index }) => {
  const [showTable, setShowTable] = useState(true);
  const toggleTable = () => {
    setShowTable(!showTable);
  };
  return (
    <div
      className="section"
      key={`orderProductsArray${orderProductArray[0].location_id}`}
    >
      {/* <TableView productsList={orderProductArray} /> */}
      <div className={`header`} onClick={toggleTable}>
        <p>
          {orderProductArray[0].store_name}:{" "}
          {`共 ${getTotal(orderProductArray)} 个菜`}
        </p>
        <div className={`control`}>
          <button onClick={toggleTable}>
            {showTable ? "收起表格" : "展开表格"}
          </button>
          <button>打印表格</button>
        </div>
      </div>
      {showTable && (
        <Table
          id={`productsOrderTable${index}`}
          ths={ths}
          dataFormat={dataFormat}
          data={orderProductArray}
          sum={false}
          striped={true}
        />
      )}
    </div>
  );
};

const ths = [
  { value: "产品名", type: "text" },
  { value: "数量", type: "number" }
];
const dataFormat = [
  { value: "product_name", type: "text" },
  { value: "quantity", type: "number" }
];

const getTotal = array => {
  return array.reduce((sum, orderItem) => {
    return sum + parseInt(orderItem.quantity);
  }, 0);
};
