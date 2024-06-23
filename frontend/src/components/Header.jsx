import { Link, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { ShopContext } from "../Context/ShopContext";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <header className="fixed top-0 right-0 left-0 mx-auto w-full bg-white ring-1 ring-slate-900/5 z-10">
      <div className="max_padd_container px-4 flexBetween py-3 max-xs:px-2">
        <div>
          <Link>
            <p>LOGO</p>
          </Link>
        </div>
        <Navbar
          containerStyles={"hidden md:flex gap-x-5 xl:gap-x-10 medium-15"}
        />
        <Navbar
          containerStyles={`${
            menuOpened
              ? "flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300"
              : "flex item-start flex-col gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 -right-[100%]"
          }`}
        />
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
          <div className="flexBetween sm:gap-x-6">
            <NavLink to={"cart-page"} className={"flex"}>
              <FaShoppingCart className="p-1 h-8 w-8 " />
            </NavLink>

            {localStorage.getItem("auth-token") ? (
              <NavLink
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  window.location.replace("/");
                }}
                to={"logout"}
                className={"btn_secondary_rounded flexCenter gap-x-2 medium-16"}
              >
                Logout
              </NavLink>
            ) : (
              <NavLink
                to={"login"}
                className={"btn_secondary_rounded flexCenter gap-x-2 medium-16"}
              >
                {" "}
                Log in
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
