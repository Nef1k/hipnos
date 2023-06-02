import useAuth from "./useAuth";
import {axiosInstance} from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axiosInstance.post('/users/token/refresh/', {},{
      withCredentials: true
    });

    setAuth(prev => {
      return { ...prev, accessToken: response.data.access }
    });

    return response.data.access;
  }

  return refresh;
}

export default useRefreshToken;
