import { Link, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { ShopContext } from "../Context/ShopContext";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);

  return (
    <header className="fixed top-0 left-0 right-0 z-10 w-full bg-gray-100">
      <div className="container mx-auto flex items-center justify-between py-4 px-6 md:px-12">
        <div>
          <Link to="/">
            <p className="text-2xl font-bold ">LOGO</p>
          </Link>
        </div>
        <Navbar containerStyles="hidden md:flex space-x-6 lg:space-x-10 text-lg" />
        <Navbar
          containerStyles={`${
            menuOpened
              ? "flex flex-col space-y-6 fixed top-16 right-6 p-8 bg-white shadow-lg rounded-xl w-64"
              : "hidden"
          }`}
        />
        <div className="flex items-center space-x-4">
          {!menuOpened ? (
            <MdMenu
              className="md:hidden text-xl cursor-pointer hover:text-gray-600"
              onClick={toggleMenu}
            />
          ) : (
            <MdClose
              className="md:hidden text-xl cursor-pointer hover:text-gray-600"
              onClick={toggleMenu}
            />
          )}
          <div className="relative">
            <NavLink to="/cart-page" className="relative">
              <FaShoppingCart className="text-xl" />
            </NavLink>
          </div>
          {localStorage.getItem("auth-token") ? (
            <NavLink
              onClick={() => {
                localStorage.removeItem("auth-token");
                window.location.replace("/");
              }}
              to="/logout"
              className="btn_secondary_rounded"
            >
              Logout
            </NavLink>
          ) : (
            <NavLink to="/login" className="btn_secondary_rounded">
              Log in
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
