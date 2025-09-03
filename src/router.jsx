import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ProjectDetail from "./pages/ProjectDetail";

const basename = "/portfolio";

const Router = () => (
  <BrowserRouter basename={basename}>
    <Routes>
      <Route path="/portfolio" element={<App />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
