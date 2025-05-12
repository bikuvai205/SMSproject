import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Import routing components

import LandingPage from "./Webpages/LandingPage";
import GettingStartedPage from "./Webpages/GettingStartPage"; // ✅ Import your second page

function App() {
  return (
    <Routes>
      {/* Main landing page */}
      <Route path="/" element={<LandingPage />} />

      {/* Getting started page */}
      <Route path="/getting-started" element={<GettingStartedPage />} />
    </Routes>
  );
}

export default App;
