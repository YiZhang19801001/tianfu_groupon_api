import React from "react";
import ShopForm from "./ShopForm";

export default ({ selectedShop, onSubmit, setShopsLayout }) => {
  const { name, address, telephone, descriptions } = selectedShop;

  const en_description = descriptions
    ? descriptions.find(x => parseInt(x.language_id) === 1)
    : null;
  const cn_description = descriptions
    ? descriptions.find(x => parseInt(x.language_id) === 2)
    : null;

  const en_name = en_description ? en_description.location_name : "";
  const cn_name = cn_description ? cn_description.location_name : "";

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
        initFormValues={{ name, address, telephone, en_name, cn_name }}
        onSubmit={onSubmit}
        setShopsLayout={setShopsLayout}
      />
    </div>
  );
};
