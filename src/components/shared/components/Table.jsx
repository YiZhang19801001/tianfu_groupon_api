import React, { useState, useEffect } from "react";
import { uniqueId } from "lodash";
import Loading from "./Loading";

/**
 * main function component
 */
export default ({ ths, data, dataFormat, sum, striped, id, onTrClick }) => {
  if (!ths || !data || ths.length === 0) {
    return <Loading />;
  } else if (data.length === 0) {
    return <Loading />;
  }

  const [tableData, setTableData] = useState([]);
  const initSortOrders = dataFormat.reduce((init, property) => {
    return { ...init, [property.value]: 0 };
  }, {});
  const [sortOrders, setSortOrders] = useState(initSortOrders);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const sort = property => {
    const sortOrder =
      sortOrders[property] === 0 || sortOrders[property] === -1 ? 1 : -1;
    setSortOrders({ ...initSortOrders, [property]: sortOrder });
    const sortedTableData = tableData.sort(dynamicSort(property, sortOrder));
    setTableData(sortedTableData);
  };

  return (
    <table id={`${id ? id : ""}`}>
      {renderThead(ths, sort, dataFormat, sortOrders)}
      {renderTbody(tableData, dataFormat, sum, striped, onTrClick)}
    </table>
  );
};

//** */
const renderThead = (ths, sort, dataFormat, sortOrders) => {
  let index = -1;
  return (
    <thead>
      <tr>
        {ths.map(th => {
          index++;
          const propertyName = dataFormat[index].value;
          const orderStatus =
            sortOrders[propertyName] === 0 || sortOrders[propertyName] === 1
              ? "increase"
              : "decrease";

          return (
            <th
              onClick={() => {
                sort(propertyName);
              }}
              key={uniqueId("th")}
              className={th.type}
            >
              <span className="th-content-container">
                <span className="th-title">{th.value}</span>
                <span className={`th-symbol ${orderStatus}`}>
                  {sortOrders[propertyName] !== 0 ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/images/table-sorting.svg`}
                      alt=""
                    />
                  ) : (
                    <img
                      src={`${
                        process.env.PUBLIC_URL
                      }/images/table-unsorting.svg`}
                      alt=""
                    />
                  )}
                </span>
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

const renderTbody = (data, dataFormat, sum, striped, onTrClick) => {
  let index = 0;
  return (
    <tbody>
      {data.map(row => {
        index++;

        return (
          <tr
            key={uniqueId("tableRow")}
            className={`${index % 2 !== 0 ? "colored" : ""} ${
              striped ? "striped" : ""
            }`}
            onClick={() => {
              onTrClick(row);
            }}
          >
            {renderTds(dataFormat, row)}
          </tr>
        );
      })}
      {sum ? (
        <tr className={`total`}>{renderTotalRow(dataFormat, data)}</tr>
      ) : null}
    </tbody>
  );
};

const renderTds = (dataFormat, row) => {
  return dataFormat.map(property => {
    return (
      <td key={uniqueId("tableRowTd")} className={property.type}>
        {renderTdPrefix(property.value, row[property.value])}
        {property.type !== "image" ? (
          <span>{row[property.value]}</span>
        ) : (
          <img src={row[property.value]} alt="" />
        )}
      </td>
    );
  });
};
const renderTdPrefix = (value, name) => {
  switch (value) {
    case "total":
    case "amount":
      return <span className="symbol">$</span>;
    case "paymenttype":
      return <span className="payment-method-symbol" />;
    case "size":
      return <span className="placeholder" />;
    default:
      return null;
  }
};
const renderTotalRow = (dataFormat, data) => {
  return dataFormat.map((property, index) => {
    if (index === 0) {
      return (
        <td key={uniqueId("tableRowTd")}>
          <span>{`Total`}</span>
        </td>
      );
    }
    if (property.type !== "number") {
      return <td key={uniqueId("tableRowTd")} />;
    }
    return (
      <td key={uniqueId("tablRowTd")} className={property.type}>
        <span> {calculateSum(property.value, data)}</span>
      </td>
    );
  });
};

const calculateSum = (property, data) => {
  if (data.length === 0) {
    return 0;
  }
  return data.reduce((total, item) => {
    return total + parseFloat(item[property]);
  }, 0);
};

const dynamicSort = (property, sortOrder) => {
  return function(a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};
