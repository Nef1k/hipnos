import { useContext } from "react";
import SnacksContext from "../context/SnacksProvider";


const useSnacks = () => {
  return useContext(SnacksContext);
}


export default useSnacks;
