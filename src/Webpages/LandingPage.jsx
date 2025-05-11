import React from "react";
import Navbar from "../Components/Navbar";
import Herosection from "../Components/Herosection";
import Features from "../Components/Features";
import Footersection from "../Components/Footersection";
const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Herosection/>
      <Features/>
      <Footersection/>
      
    </div>
  );
};

export default LandingPage;
