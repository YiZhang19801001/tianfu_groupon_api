import React, { useState } from "react";

import SubMenu from "./SubMenu";
import Logout from "./Logout";
const LeftSideMenu = () => {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="component-left-side-menu">
      <div className="component-left-side-menu__icon">
        <img
          onClick={() => {
            setShowLogout(!showLogout);
          }}
          src="favicon.ico"
          alt=""
        />
      </div>
      {showLogout && <Logout setShowLogout={setShowLogout} />}
      <SubMenu />
    </div>
  );
};

export default LeftSideMenu;
