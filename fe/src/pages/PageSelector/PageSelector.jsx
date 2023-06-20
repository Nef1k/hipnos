import {Box, CircularProgress} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useNavigate} from "react-router-dom";

const PageSelector = ({timeout}) => {
  const [currentPage, setCurrentPage] = useState(null);
  const [error, setError] = useState("");

  const waitTimeout = timeout || 2000;

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const timeoutTimer = useRef(null);

  const fetchUserDefaultPage = async () => {
    try {
      const response = await axiosPrivate.get("synergy/pages/user_default/");
      setCurrentPage(response?.data?.page);
    } catch (e) {
      console.log(e);
    }
  }

  const handleNavigate = (pageUrl) => {
    timeoutTimer.current && clearTimeout(timeoutTimer.current);
    navigate(pageUrl, {replace: true});
  }
  const handleNoPage = () => {
    setError("Выберете страницу");
  }

  useEffect(() => {
    fetchUserDefaultPage().catch();
    timeoutTimer.current = setTimeout(handleNoPage, waitTimeout);
  }, []);

  useEffect(() => {
    const cleanup = () => {}

    if (!Boolean(currentPage)) return cleanup;

    const pageName = currentPage?.name;
    handleNavigate(`${pageName}/`);

    return cleanup;
  }, [currentPage]);

  return (
    <Box sx={{display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
      {error
        ? <Box>{ error }</Box>
        : <CircularProgress/>
      }
    </Box>
  )
}

export default PageSelector;
