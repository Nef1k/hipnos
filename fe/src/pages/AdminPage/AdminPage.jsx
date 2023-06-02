import useAuth from "../../hooks/useAuth";
import {useEffect} from "react";

const AdminPage = () => {
  const {auth} = useAuth();

  useEffect(() => {
    console.log("auth: ", auth);
  })

  return (
    <>Username: {auth.username}</>
  )
}

export default AdminPage;
