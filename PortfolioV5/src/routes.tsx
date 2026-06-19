import { Routes, Route } from "react-router-dom";
import HomeView from "./screens/HomeView";
import CertificatesArchive from "./screens/certificatesArchive";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/certificates-archive" element={<CertificatesArchive />} />
    </Routes>
  );
}
