import React, { useReducer } from "react";
import moment from "moment";
import { uniqueId } from "lodash";

const reducer = (state, action) => {
  switch (action.type) {
    case "setState":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const initState = {
  editable: false
};

const StoreListItem = ({ shop, updatePickupDate, deletePickupDate }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  console.log({ deletePickupDate });
  const { editable } = state;

  const { name, pickup_date } = shop;
  if (!pickup_date) {
    return <div>{JSON.stringify(shop)}</div>;
  }
  return (
    <div className={`store-list-item`} key={uniqueId()}>
      <div className={`content`}>
        <div className={`name`}>{name}</div>
        <div className={`date-list`}>
          {pickup_date.map(date => {
            return !editable ? (
              <div key={uniqueId()} className={`date-list-item`}>
                {moment(date.date).format("YYYY-MMM-Do dddd")}
              </div>
            ) : (
              <div className={`date-list-item`}>
                <input
                  type="date"
                  value={date.date}
                  className={`input`}
                  onChange={e => {
                    updatePickupDate(date.pickup_date_id, e.target.value);
                  }}
                />
                <i
                  className="material-icons"
                  onClick={() => {
                    deletePickupDate(date.pickup_date_id);
                  }}
                >
                  delete_forever
                </i>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`control`}>
        <button
          className={`button-edit`}
          onClick={e => {
            dispatch({ type: "setState", payload: { editable: !editable } });
          }}
        >
          {editable ? `save` : `edit`}
        </button>
      </div>
    </div>
  );
};

export default StoreListItem;
