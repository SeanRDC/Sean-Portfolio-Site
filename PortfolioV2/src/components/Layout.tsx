import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MeshBackground from "./MeshBackground";
import GlassCursor from "./GlassCursor";
import Dock from "./Dock";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();

  // reset scroll on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative min-h-screen">
      <MeshBackground />
      <GlassCursor />
      <Dock />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
