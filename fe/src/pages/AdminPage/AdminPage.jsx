import TabsPanel from "../../components/AdminComponents/Tabs/TabsPanel/TabsPanel";
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AdminPage = forwardRef((props, ref) => {
  const [pageData, setPageData] = useState(null);

  const {pageName} = useParams();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    async test1() {
      console.log("test1");
    },
    async test2() {
      console.log("test2");
    },
  }));

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
        pageName={pageName}
        page={pageData}
      />
    </div>
  )
});

export default AdminPage;
