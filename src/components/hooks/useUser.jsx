import { useEffect } from "react";

export const CheckLogin = cb => {
  useEffect(() => {
    cb();
  }, []);
};

export const userLogin = (values, cb) => {
  cb(values);
};
