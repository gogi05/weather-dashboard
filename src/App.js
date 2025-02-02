import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import AllDetailsPage from "./pages/AllDetailsPage";
import Layout from "./Layout";
import SkeletonLoader from "./components/SkeletonLoader";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<OverviewPage />} />
          <Route path="/details" element={<AllDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
