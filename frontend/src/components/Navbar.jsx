import { NavLink } from "react-router-dom";
import { MdCategory, MdContacts, MdHomeFilled, MdShop2 } from "react-icons/md";

const Navbar = ({ containerStyles }) => {
  return (
    <nav className={`${containerStyles}`}>
      <NavLink to={"/"}>
        <div className="flexCenter gap-x-1">Home</div>
      </NavLink>
      <NavLink to={"/all"}>
        <div className="flexCenter gap-x-1">Shop</div>
      </NavLink>
    </nav>
  );
};

export default Navbar;
