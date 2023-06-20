import s from './DashboardFrame.module.css';
import AppNav from "../AppNav/AppNav";
import {Outlet, useNavigate} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {useEffect, useState} from "react";

const DashboardFrame = () => {
  const axiosPrivate = useAxiosPrivate();
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  const fetchPages = async () => {
    try {
      const response = await axiosPrivate.get("synergy/pages/");
      setPages(response?.data);
    } catch (e) {
      console.log(e);
    }
  }

  const setUserDefaultPage = async (newPage) => {
    axiosPrivate.post("synergy/pages/user_default/", {
      page_id: newPage?.id,
    });
  }

  const handlePageAdd = async () => {
    console.log("page add");
  }

  const handlePageChange = async (newPage) => {
    if (!newPage) return;

    await setUserDefaultPage(newPage);
    navigate(`${newPage?.name}/`);
  }

  useEffect(() => {
    fetchPages().catch();
  }, []);

  return (
    <div className={s.mainWrapper}>
      <AppNav
        pages={pages}
        onPageAdd={handlePageAdd}
        onPageChange={handlePageChange}
      />
      <Outlet />
    </div>
  )
}

export default DashboardFrame;
