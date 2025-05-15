import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Landing/Navbar";
import Herosection from "../Components/Landing/Herosection";
import Features from "../Components/Landing/Features";
import About from "../Components/Landing/About";
import Footersection from "../Components/Landing/Footersection";
import { useLocation } from "react-router-dom";

const LandingPage = () => {
  const location = useLocation(); // ⬅️ to read scrollTo state
  const [activeSection, setActiveSection] = useState("home");

  const sectionRefs = {
    home: useRef(null),
    features: useRef(null),
    about: useRef(null),
    contact: useRef(null),
  };

  // ✅ Scroll to section from external route using state
  useEffect(() => {
    const scrollTarget = location.state?.scrollTo;
    if (scrollTarget && sectionRefs[scrollTarget]?.current) {
      sectionRefs[scrollTarget].current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  // ✅ Scroll to section when clicked in Navbar
  const scrollToSection = (id) => {
    sectionRefs[id]?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // ✅ Track which section is active (used for highlighting)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <div>
      {/* ✅ Pass activeSection and scroll function to navbar */}
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      <div id="home" ref={sectionRefs.home} className="scroll-mt-20">
        <Herosection />
      </div>

      <div id="features" ref={sectionRefs.features} className="scroll-mt-20">
        <Features />
      </div>

      <div id="about" ref={sectionRefs.about} className="scroll-mt-20">
        <About />
      </div>

      <div id="contact" ref={sectionRefs.contact} className="scroll-mt-20">
        <Footersection />
      </div>
    </div>
  );
};

export default LandingPage;
