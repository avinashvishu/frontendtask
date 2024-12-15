import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-[95%] mx-auto px-4">
        {/* Top Section: Links */}
        <div className="flex flex-wrap justify-center sm:justify-between items-center mb-6 border-b border-gray-700 pb-6">
          <div className="flex space-x-6 text-sm sm:text-base">
            <a href="/about" className="hover:text-teal-400 transition">
              About Us
            </a>
            <a href="/contact" className="hover:text-teal-400 transition">
              Contact
            </a>
            <a href="/team" className="hover:text-teal-400 transition">
              Team
            </a>
            <a href="/careers" className="hover:text-teal-400 transition">
              Careers
            </a>
            <a
              href="/privacy-policy"
              className="hover:text-teal-400 transition"
            >
              Privacy Policy
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-teal-400 transition text-lg"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-teal-400 transition text-lg"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-teal-400 transition text-lg"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-teal-400 transition text-lg"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-wrap justify-between items-center text-sm sm:text-base">
          <p className="text-gray-400">
            &copy; 2024 PaySpaze. All rights reserved.
          </p>
          <p className="text-gray-400">
            Built with ❤️ by{" "}
            <a
              href="https://payspaze.com"
              className="text-teal-400 hover:underline transition"
            >
              PaySpaze Team
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
