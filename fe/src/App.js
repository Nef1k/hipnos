import './App.css';
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MemoriesPage from "./pages/MemoriesPage/MemoriesPage";

function App() {
  return (
    <div className="App">
      <div className="pageWrapper">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="memories/:memoryId" element={<MemoriesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
