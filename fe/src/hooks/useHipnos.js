import useAxiosPrivate from "./useAxiosPrivate";
import hipnosApi from "../api/hipnosApi";

const useHipnos = () => {
  const axiosPrivate = useAxiosPrivate();

  return hipnosApi({axiosPrivate});
}

export default useHipnos;
