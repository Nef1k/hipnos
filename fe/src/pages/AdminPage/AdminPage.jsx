import TabsPanel from "../../components/AdminComponents/Tabs/TabsPanel/TabsPanel";
import {useEffect, useState} from "react";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AdminPage = () => {
  const [pageData, setPageData] = useState(null);
  const [tabsRef] = useOutletContext();

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

  useEffect(() => {
    fetchPage(pageName).catch();
  }, [pageName]);

  return (
    <div style={{flexDirection: 'column', height: "100%"}}>
      <TabsPanel
        ref={tabsRef}
        pageName={pageName}
        page={pageData}
      />
    </div>
  )
}

export default AdminPage;
