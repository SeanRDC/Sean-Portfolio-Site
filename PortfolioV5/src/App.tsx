import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import SmoothScroll from "./components/SmoothScroll";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <AppRoutes />
      </SmoothScroll>
    </BrowserRouter>
  );
}