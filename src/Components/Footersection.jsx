import React from 'react';
import logo from "../assets/image/logos.png";
const Footersection = () => {
  return (
    <footer className="footer bg-gray-900 text-white py-12">
       <div className="text-center border-t border-gray-700 pt-6"></div>
      <div className="container mx-auto px-4">
        
        {/* Logo and Call-to-action */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <img src={logo} alt="School Logo" className="h-12" />Adhyanam
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold">Wander around the page with help</h2>
            
          </div>
          
          
        </div>

        {/* Footer links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            {/* <h4 className="font-semibold mb-4">School Info</h4> */}
            <ul className="space-y-2 text-center text-gray-300">
              <li><a href="/home" className="hover:underline">Home</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/faculty" className="hover:underline">Features</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-center mb-4"><b>Quick Links:</b></h4>
            <ul className="space-y-2 text-center text-gray-300">
              <li><a href="/calendar" className="hover:underline">Login</a></li>
              <li><a href="/notices" className="hover:underline">Notices</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4"><b>Follow Us:</b></h4>
           <div className="flex space-x-4">
  <a
    href="https://facebook.com/YourSchoolPage"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="hover:text-blue-500"
  >
    <i className="fab fa-facebook fa-lg"></i>
  </a>
  <a
    href="https://twitter.com/YourSchoolHandle"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Twitter"
    className="hover:text-blue-400"
  >
    <i className="fab fa-twitter fa-lg"></i>
  </a>
  <a
    href="https://linkedin.com/school/YourSchoolPage"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="hover:text-blue-300"
  >
    <i className="fab fa-linkedin fa-lg"></i>
  </a>
</div>

          </div>
        </div>

        {/* Footer bottom */}
        <div className="text-center border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">&copy; 2025 EduSmart. All rights reserved.</p>
          <p className="text-sm text-gray-400">Built with ❤️ by the IT Department</p>
        </div>
      </div>
    </footer>
  );
};

export default Footersection;
