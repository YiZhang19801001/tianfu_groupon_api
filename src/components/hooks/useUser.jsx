import { useEffect } from "react";

export const CheckLogin = cb => {
  useEffect(() => {
    cb();
  }, []);
};

export const userLogin = (values, cb) => {
  cb(values);
};

export const userLogout = () => {
  localStorage.removeItem("tianfu_groupon_user");
  window.location.reload();
};
