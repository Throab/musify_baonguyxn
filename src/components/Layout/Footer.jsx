// src/components/Footer.jsx
import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-musify-dark text-white py-6 mt-8">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Nguyen Thanh Bao</h2>
          <p className="text-gray-400">(+84) 843 175 549</p>
          <p className="text-gray-400">thanhbaontb16@gmail.com</p>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a
            href="https://github.com/Throab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaGithub size={24} />
          </a>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaInstagram size={24} />
          </a>
        </div>
        <div className="text-gray-400">
          © {new Date().getFullYear()} Nguyen Thanh Bao. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
