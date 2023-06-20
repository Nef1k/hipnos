import './App.css';
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MemoriesPage from "./pages/MemoriesPage/MemoriesPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import BaseLayout from "./components/AdminComponents/BaseLayout/BaseLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import PersistLogin from "./components/AdminComponents/PersistLogin/PersistLogin";
import RequireAuth from "./components/AdminComponents/RequireAuth/RequireAuth";
import DashboardFrame from "./components/AdminComponents/DashboardFrame/DashboardFrame";
import PageSelector from "./pages/PageSelector/PageSelector";

function App() {
  return (
    <div className="App">
      <div className="pageWrapper">
        <Routes>
          {/*Protected pages (admin dashboard)*/}
          <Route path="/" element={<BaseLayout/>}>
            <Route element={<PersistLogin/>}>
              <Route element={<RequireAuth/>}>
                <Route element={<DashboardFrame/>}>
                  <Route index element={<PageSelector timeout={1000} />}/>

                  <Route path=":pageName/" element={<AdminPage />} />
                </Route>
              </Route>

              <Route path="login/" element={<LoginPage/>}/>
            </Route>
          </Route>

          {/*Public pages*/}
          <Route path="hipnos/" element={<MainPage/>}/>
          <Route path="memories/:memoryId" element={<MemoriesPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
