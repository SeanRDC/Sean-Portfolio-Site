import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import SmoothScroll from "./components/SmoothScroll";
import AnalyticsTracker from "./AnalyticsTracker";
import { reportWebVitals } from "./reportWebVitals";
import "./index.css";

// Initialize core web vitals tracking for Google Analytics
reportWebVitals();

export default function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <SmoothScroll>
        <AppRoutes />
      </SmoothScroll>
    </BrowserRouter>
  );
}