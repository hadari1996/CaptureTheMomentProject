import React, { useState } from "react";
import Nav, {
  A,
  HamburgerButton,
  Logo,
  NavigationMenu,
  NavigationMenuLi,
  NavigationMenuUl,
} from "./navigation/Navigation";
import logo from "../imges/photologo.png";
import { ThemeProvider } from "styled-components";
import theme from "../colors/color";
import { Link } from "react-router-dom";
import { Logout } from "./Logout";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  return (
    <ThemeProvider theme={theme}>
      <Nav>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <A
            isBrandName={true}
            style={{ backgroundColor: "none", padding: "0" }}
          >
            <Link to="/">
              <Logo src={logo} alt="logo"></Logo>
            </Link>
          </A>
          <Logout />
          <HamburgerButton>
            <MenuIcon
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            ></MenuIcon>
          </HamburgerButton>
        </Box>
        <NavigationMenu>
          <NavigationMenuUl NavExpanded={isNavExpanded}>
            <NavigationMenuLi>
              <A isBrandName={false}>
                <Link to="/about" style={{ color: "black" }}>
                  קצת עלי
                </Link>
              </A>
            </NavigationMenuLi>
            <NavigationMenuLi>
              <A isBrandName={false}>
                <Link style={{ color: "black" }} to={"/gallery"}>
                  גלריה
                </Link>
              </A>
            </NavigationMenuLi>

            <NavigationMenuLi>
              <A isBrandName={false}>
                <Link to="/your-event" style={{ color: "black" }}>
                  תזמן את הרגע שלך
                </Link>
              </A>
            </NavigationMenuLi>
            <NavigationMenuLi>
              <A isBrandName={false}>
                {user?.role === 1 ? (
                  <Link to="/admin" style={{ color: "black" }}>
                    admin
                  </Link>
                ) : (
                  <Link
                    to="/your-date-package-selected"
                    style={{ color: "black" }}
                  >
                    החבילה שלך
                  </Link>
                )}
              </A>
            </NavigationMenuLi>
            <NavigationMenuLi>
              <A isBrandName={false}>
                <Link to="/home" style={{ color: "black" }}>
                  בית
                </Link>
              </A>
            </NavigationMenuLi>
          </NavigationMenuUl>
        </NavigationMenu>
      </Nav>
    </ThemeProvider>
  );
}

export default Navbar;
