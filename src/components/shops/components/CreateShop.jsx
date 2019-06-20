import React from "react";
import ShopForm from "./ShopForm";

export default ({ onSubmit, setShopsLayout }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ShopForm
        initFormValues={{ name: "", address: "", telephone: "" }}
        onSubmit={onSubmit}
        setShopsLayout={setShopsLayout}
      />
    </div>
  );
};
