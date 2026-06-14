import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Map paths to specific titles
    const titles: { [key: string]: string } = {
      "/": "Sean | About",
      "/work": "Sean | Work",
      "/certificates": "Sean | Certificates",
    };

    const baseTitle = titles[pathname] || "Sean | Portfolio";
    
    if (pathname.startsWith("/project/")) {
      document.title = "Sean | Project";
    } else {
      document.title = baseTitle;
    }
  }, [pathname]);

  return null;
}