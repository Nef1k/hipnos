import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
  const {setAuth} = useAuth();
  const axiosPrivate = useAxiosPrivate();

  return async () => {
    setAuth({});

    try {
      await axiosPrivate.post('/users/logout/', {}, {
        withCredentials: true
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default useLogout;
