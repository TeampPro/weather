import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllTasks from "./pages/AllTasks";
import WeekTasks from "./pages/WeekTasks";
import MonthTasks from "./pages/MonthTasks";
import SharedTasks from "./pages/SharedTasks";
import WeatherBoard from "./pages/WeatherBoard";
import Header from "./components/Header/Header";
import AddTaskPage from "./pages/AddTaskPage";
import KakaoMapBox from "./pages/KakaoMapBox";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <WeatherBoard />
      <div className="main-layout">
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} /> 
            <Route path="/" element={<AllTasks />} />
            <Route path="/week" element={<WeekTasks />} />
            <Route path="/month" element={<MonthTasks />} />
            <Route path="/shared" element={<SharedTasks />} />
            <Route path="/add" element={<AddTaskPage />} />
          </Routes>
        </div>

        {/* 지도 검색영역 */}
        <KakaoMapBox />
      </div>
    </BrowserRouter>
  );
}

export default App;
