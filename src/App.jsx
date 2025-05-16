import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Import routing components
import LandingPage from "./Webpages/LandingPage"; //landing page import
import GettingStartedPage from "./Webpages/GettingStartPage"; // getteing started page import
import LoginPage from "./Webpages/LoginPage"; //login page import

function App() {
  return (
    <Routes>
      {/* Landing page  home page*/}
      <Route path="/" element={<LandingPage />} />
      {/* Getting Started page */}
      <Route path="/getting-started" element={<GettingStartedPage />} />
      {/* Login page */}
     <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}


export default App;
