import { Routes, Route } from "react-router-dom";
import DocumentTitle from "./components/DocumentTitle"; // Import the new helper
import Layout from "./components/Layout";
import HomeView from "./screens/HomeView";
import WorkView from "./screens/WorkView";
import ProjectView from "./screens/ProjectView";
import CertificatesView from "./screens/CertificatesView";

export default function AppRoutes() {
  return (
    <>
      <DocumentTitle />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/work" element={<WorkView />} />
          <Route path="/project/:id" element={<ProjectView />} />
          <Route path="/certificates" element={<CertificatesView />} />
        </Route>
      </Routes>
    </>
  );
}