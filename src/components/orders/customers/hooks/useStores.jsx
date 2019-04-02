import { useEffect } from "react";

const useStores = cb => {
  useEffect(() => {
    cb();
  }, []);
  console.log("render hooks");
};

export default useStores;
