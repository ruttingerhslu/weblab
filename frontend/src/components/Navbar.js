import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/admin" activeStyle>
            Admin
          </NavLink>
          <NavLink to="/radar" activeStyle>
            Technology radar
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
