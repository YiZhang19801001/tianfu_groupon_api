import React, { useState } from "react";
import useStores from "./hooks/useStores";

/**
 *
 * @param {object} props
 * @return {JSX} selector for choose store, CONTROL - show customer orders by store.
 */
const StoreSelector = ({ shops, getShops, setStoreForReports }) => {
  useStores(getShops);
  const [storeId, setStoreId] = useState("text_label");
  return (
    <select
      value={storeId}
      onChange={e => {
        setStoreForReports(e.target.value);
        setStoreId(e.target.value);
      }}
    >
      {renderOptions(shops)}
    </select>
  );
};

const renderOptions = shops => {
  if (shops.length === 0) {
    return (
      <option value="text_label" disabled={true}>
        --没有可选商铺-
      </option>
    );
  }
  return (
    <>
      <option value="text_label" disabled={true}>
        --选商铺--
      </option>
      {shops.map(store => {
        return (
          <option
            value={store.location_id}
            key={`reportsByStore${store.location_id}`}
          >
            {store.name}
          </option>
        );
      })}
    </>
  );
};

export default StoreSelector;
