import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";

const Navbar = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);

  return (
    <header className="fixed top-0 right-0 left-0 mx-auto w-full bg-white ring-1 ring-slate-900/5 z-10">
      <div className="max_padd_container px-4 flexBetween py-3 max-xs:px-2">
        <div>
          <Link to="/">
            <p>LOGO</p>
          </Link>
        </div>
        <nav className="hidden md:flex gap-x-5 xl:gap-x-10 medium-15">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active_link" : "")}
          >
            <div className="flexCenter gap-x-1">Products</div>
          </NavLink>
          <NavLink
            to="/addproduct"
            className={({ isActive }) => (isActive ? "active_link" : "")}
          >
            <div className="flexCenter gap-x-1">Add product</div>
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) => (isActive ? "active_link" : "")}
          >
            <div className="flexCenter gap-x-1">Orders</div>
          </NavLink>
        </nav>
        <nav
          className={`${
            menuOpened
              ? "flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300"
              : "flex item-start flex-col gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 -right-[100%]"
          }`}
        >
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active_link" : "")}
          >
            <div className="flexCenter gap-x-1">List Products</div>
          </NavLink>
          <NavLink
            to="/addproduct"
            className={({ isActive }) => (isActive ? "active_link" : "")}
          >
            <div className="flexCenter gap-x-1">Add product</div>
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) => (isActive ? "active_link" : "")}
          >
            <div className="flexCenter gap-x-1">Orders</div>
          </NavLink>
        </nav>
        {/* buttons */}
        <div className="flexBetween sm:gap-x-2 bold-16">
          {!menuOpened ? (
            <MdMenu
              className="md:hidden cursor-pointer hover:text-secondary mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full "
              onClick={toggleMenu}
            />
          ) : (
            <MdClose
              className="md:hidden cursor-pointer hover:text-secondary mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full "
              onClick={toggleMenu}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
