import s from './DashboardFrame.module.css';
import AppNav from "../AppNav/AppNav";
import {Outlet} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {useEffect, useState} from "react";

const DashboardFrame = () => {
  const axiosPrivate = useAxiosPrivate();
  const [pages, setPages] = useState([]);

  const fetchPages = async () => {
    try {
      const response = await axiosPrivate.get("synergy/pages/");
      setPages(response?.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchPages().catch();
  }, []);

  return (
    <div className={s.mainWrapper}>
      <AppNav
        pages={pages}
      />
      <Outlet />
    </div>
  )
}

export default DashboardFrame;
