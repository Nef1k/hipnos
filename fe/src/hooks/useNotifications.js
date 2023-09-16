import {useContext} from "react";
import {SNotificationsContext} from "../context/SNotificationsProvider";

const useNotifications = () => {
  return useContext(SNotificationsContext);
}

export default useNotifications;
