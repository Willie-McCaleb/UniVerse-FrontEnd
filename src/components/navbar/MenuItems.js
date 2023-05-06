import { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";

const MenuItems = ({ menu, depthlevel }) => {
  const [dropdown, setDropdown] = useState(false);

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {menu.submenu ? (
        <>
          <button
            type="button"
            href={menu.url}
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            <i className={menu.icon}></i>
            {menu.title}{" "}
            {depthlevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}{" "}
          </button>{" "}
          <Dropdown
            depthlevel={depthlevel}
            submenus={menu.submenu}
            dropdown={dropdown}
          />{" "}
        </>
      ) : (
        <a href={menu.url}>
          {" "}
          <i className={menu.icon}></i>
          {menu.title}{" "}
        </a>
      )}{" "}
    </li>
  );
};

export default MenuItems;
