import { Routes, Route, Navigate } from "react-router-dom";
import HomeView from "./screens/HomeView";
import CertificatesArchive from "./screens/certificatesArchive";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/certificates-archive" element={<CertificatesArchive />} />
      {/* Unknown paths would otherwise render a blank page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}