import { useContext } from "react";
import { AppContext } from "./Context";

function useGlobalContext() {
  return useContext(AppContext);
}

export { useGlobalContext };
