import { useEffect } from "react";

export const CheckLogin = cb => {
  useEffect(() => {
    cb();
  }, []);
};
