import { useEffect } from "react";

const checkLogin = cb => {
  useEffect(() => {
    cb();
  }, []);
};

export default checkLogin;
