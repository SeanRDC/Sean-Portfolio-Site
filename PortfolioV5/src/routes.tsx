import { Routes, Route } from "react-router-dom";
import HomeView from "./screens/HomeView";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
    </Routes>
  );
}
