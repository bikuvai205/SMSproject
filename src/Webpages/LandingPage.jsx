import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Herosection from "../Components/Herosection";
import Features from "../Components/Features";
import About from "../Components/About";
import Footersection from "../Components/Footersection";

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState("home");

  const sectionRefs = {
    home: useRef(null),
    features: useRef(null),
    about: useRef(null),
    contact: useRef(null),
  };

  // Scroll to section when clicked
  const scrollToSection = (id) => {
    sectionRefs[id]?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Track visible section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6, // 60% of section must be visible
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
