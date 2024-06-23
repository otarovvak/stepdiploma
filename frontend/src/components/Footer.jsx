import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = ({ containerStyles }) => {
  return (
    <footer
      className={`${containerStyles} flex flex-col items-center py-8 bg-hero`}
    >
      <div className="flex gap-4 mb-4">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            size={24}
          />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            size={24}
          />
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            size={24}
          />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            size={24}
          />
        </a>
      </div>
      <nav className="flex gap-8 text-gray-600">
        <NavLink to={"/"}>
          <div className="flexCenter">Home</div>
        </NavLink>
        <NavLink to={"/all"}>
          <div className="flexCenter">Shop</div>
        </NavLink>
        <NavLink to={"/cart-page"}>
          <div className="flexCenter">Cart</div>
        </NavLink>
      </nav>
    </footer>
  );
};

export default Footer;
