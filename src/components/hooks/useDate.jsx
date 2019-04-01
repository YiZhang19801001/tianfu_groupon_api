import { useEffect } from "react";

export const useSalesGroups = cb => {
  useEffect(() => {
    cb();
  }, []);
};
