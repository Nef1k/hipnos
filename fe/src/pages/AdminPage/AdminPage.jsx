import TabsPanel from "../../components/AdminComponents/Tabs/TabsPanel/TabsPanel";
import {useEffect, useState} from "react";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AdminPage = () => {
  const [pageData, setPageData] = useState(null);
  const [tabsRef] = useOutletContext();
  const [tabTypes, setTabTypes] = useState([]);

  const {pageName} = useParams();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();



  async function fetchPage(pageName) {
    try {
      const response = await axiosPrivate.get(`/synergy/pages/${pageName}/`);
      setPageData(response?.data);
    } catch (e) {
      console.log(e);
      if (e.response.status === 404) {
        navigate("/");
      }
    }
  }

  async function removeTab(tabId) {
    try {
      await axiosPrivate.delete(`/synergy/tabs/${tabId}/`);
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchTabTypes() {
    try {
      const response = await axiosPrivate.get(`synergy/tabs/types/`);
      setTabTypes(response?.data);
    }
    catch (e) {
      console.log(e);
    }
  }

  const handleTabsReload = async () => {
    fetchPage(pageName).catch();
  }

  const handleTabRemove = async (tabId) => {
    await removeTab(tabId);
  }

  useEffect(() => {
    fetchPage(pageName).catch();
    fetchTabTypes().catch();
  }, [pageName]);

  return (
    <div style={{flexDirection: 'column', height: "100%"}}>
      <TabsPanel
        ref={tabsRef}
        pageName={pageName}
        page={pageData}
        tabTypes={tabTypes}
        onTabsReload={handleTabsReload}
        onTabRemove={handleTabRemove}
      />
    </div>
  )
}

export default AdminPage;
