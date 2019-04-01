import React from "react";
import { userLogout } from "./hooks";

const Logout = ({ setShowLogout }) => {
  const close = () => {
    setShowLogout(false);
  };
  return (
    <div className="component-log-out" onClick={close}>
      <div
        className="control-panel"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <p>是否确定登出控制台</p>
        <div className="button-group">
          <button
            onClick={() => {
              userLogout();
            }}
            className="logout"
          >
            确定登出
          </button>
          <button onClick={close} className="cancel">
            继续操作控制台
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
