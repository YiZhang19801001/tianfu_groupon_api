import React, { useState } from "react";
import { Table } from "../../shared";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default ({ orderProductArray, index }) => {
  const [showTable, setShowTable] = useState(true);
  const toggleTable = () => {
    setShowTable(!showTable);
  };
  return (
    <div
      className="section"
    >
      {/* <TableView productsList={orderProductArray} /> */}
      <div className={`header`} onClick={toggleTable}>
        <p>
          {orderProductArray.location}
        </p>

      </div>
      {orderProductArray.data.map((x) => {
        return <div key={`order-product-row-divide-by-date-${orderProductArray.location}-${x.date}`} className={`sub-table`}>
          <div className={`sub-table-section-header`}>
            <span>{`${x.date} 共 ${getTotal(x.products)} 个菜`}</span>
            <div
              className={`control`}
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <button onClick={toggleTable}>
                {showTable ? "收起表格" : "展开表格"}
              </button>
              <ReactHTMLTableToExcel
                id={`printExcelButton${index}`}
                table={`productsOrderTable${index}`}
                className="button"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Download as XLS"
              />
            </div>
          </div>
          {showTable && (
            <Table
              id={`productsOrderTable${index}`}
              ths={ths}
              dataFormat={dataFormat}
              data={x.products}
              sum={false}
              striped={true}
            />
          )}
        </div>
      })}
    </div>
  );
};

const ths = [
  { value: "产品名", type: "text" },
  { value: "数量", type: "number" }
];
const dataFormat = [
  { value: "name", type: "text" },
  { value: "quantity", type: "number" }
];

const getTotal = array => {
  return array.reduce((sum, orderItem) => {
    return sum + parseInt(orderItem.quantity);
  }, 0);
};
