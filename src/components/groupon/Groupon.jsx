import React, { useReducer } from "react";
import SalesGroupSelector from "./SalesGroupSelector";

import SalesGroup from "./SalesGroup";
// import Store from "./Store";
import Location from "./Location";

const reducer = (state, action) => {
  switch (action.type) {
    case "setState":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

const initState = {
  showSalesGroup: false,
  showStore: true
};

const Groupon = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const { showSalesGroup, showStore } = state;

  return (
    <div className="screen-groupon">
      {!showSalesGroup ? (
        <SalesGroupSelector dispatch={dispatch} />
      ) : (
        <SalesGroup dispatch={dispatch} />
      )}
      {showStore && <Location />}
    </div>
  );
};

export default Groupon;
