import { CSSProperties } from "react";
import { AiFillHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { PiVisorThin } from "react-icons/pi";

const Footer = () => {
  const active = {
    backgroundColor: "antiquewhite",
    borderRadius: "50%",
    padding: "0.5rem",
    color: "#350b38",
  };

  return (
    <>
      <footer>
        <NavLink
          className="btn"
          id="homeBtn"
          aria-label="Home Button"
          to="/"
          style={({ isActive }) =>
            isActive ? (active as CSSProperties) : undefined
          }
        >
          <AiFillHome />
        </NavLink>
        <NavLink
          className="btn"
          id="genreBtn"
          aria-label="Genre Button"
          to="genres"
          style={({ isActive }) =>
            isActive ? (active as CSSProperties) : undefined
          }
        >
          <PiVisorThin />
        </NavLink>
      </footer>
    </>
  );
};
export default Footer;
