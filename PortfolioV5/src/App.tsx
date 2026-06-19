import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader"; // Ensure path is correct
import "./index.css";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <BrowserRouter>
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      <div 
        style={{ 
          opacity: isLoaded ? 1 : 0, 
          transition: "opacity 0.5s ease-in-out" 
        }}
      >
        <SmoothScroll>
          <AppRoutes />
        </SmoothScroll>
      </div>
    </BrowserRouter>
  );
}