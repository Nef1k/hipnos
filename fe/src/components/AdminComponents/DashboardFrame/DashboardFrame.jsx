import s from './DashboardFrame.module.css';
import AppNav from "../AppNav/AppNav";
import {Outlet, useNavigate} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {useEffect, useRef, useState} from "react";

const DashboardFrame = () => {
  const tabsRef = useRef(null);

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
    await axiosPrivate.post("synergy/pages/user_default/", {
      page_id: newPage?.id,
    });
  }

  const createWidget = async (pageName) => {
    try {
      const response = await axiosPrivate.post(`synergy/pages/${pageName}/create_widget/`);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }

  const handlePageAdd = async () => {
    console.log("page add");
  }

  const handlePageChange = async (newPage) => {
    if (!newPage) return;

    await setUserDefaultPage(newPage);
    await fetchPages();
    navigate(`${newPage?.name}/`);
  }

  const handleWidgetAdd = async () => {
    const page = tabsRef?.current?.getCurrentPage();
    const newTab = await createWidget(page?.name);
    // await new Promise(resolve => setTimeout(resolve, 500));
    // console.log(newTab);
    tabsRef?.current?.createWidget(newTab.id).catch();
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
        onWidgetAdd={handleWidgetAdd}
      />
      <Outlet
        context={[tabsRef]}
      />
    </div>
  )
}

export default DashboardFrame;
