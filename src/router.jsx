import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ProjectDetail from "./pages/ProjectDetail";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
