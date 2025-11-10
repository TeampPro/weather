// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import WeatherBoard from "./pages/WeatherBoard";
import AllTasks from "./pages/AllTasks";
import WeekTasks from "./pages/WeekTasks";
import MonthTasks from "./pages/MonthTasks";
import SharedTasks from "./pages/SharedTasks";
import AddTaskPage from "./pages/AddTaskPage";
import KakaoMapBox from "./pages/KakaoMapBox";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ChatPage from "./pages/ChatPage";

function App() {
  const location = useLocation();
  const isChat = location.pathname === "/chat";

  return (
    <>
      <Header />
      {/* ✅ /chat 에서는 WeatherBoard 숨김 */}
      {!isChat && <WeatherBoard />}

      <div className="main-layout">
        <div className="content" style={{ minHeight: "70vh" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/tasks" element={<AllTasks />} />
            <Route path="/week" element={<WeekTasks />} />
            <Route path="/month" element={<MonthTasks />} />
            <Route path="/shared" element={<SharedTasks />} />
            <Route path="/add" element={<AddTaskPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </div>

        {!isChat && <KakaoMapBox />}
      </div>
    </>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
