import { useEffect } from "react";

const useOverFlowHidden = () => {
  useEffect(() => {
    document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);
};

export default useOverFlowHidden;
