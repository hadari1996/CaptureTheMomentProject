import styled from "styled-components";
import { FC } from "react";
import { Link } from "react-router-dom";

interface StyledAProps {
  isBrandName: boolean;
}

interface NavExpandedProps {
  NavExpanded: boolean;
}

const Nav = styled.div`
  font-family: "Rubik", sans-serif;

  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  color: black;
  box-shadow: 0 2px 2px 2px rgba(9, 9, 9, 0.23);
  background-color: ${(props) => props.theme.light.primary};
  color: ${(props) => props.theme.light.text};
`;
const Logo = styled.img`
  border: 0;
  height: 40px;
  width: 70px;
  padding: 0.1rem;
  margin-left: 3rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  position: absolute;
  top: 45%;
  left: 25px;
  transform: translateY(-50%);
`;
const A = styled.div<StyledAProps>`
  text-decoration: none;
  color: black;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 1.3rem;
  padding-bottom: 1.5rem;

  &:hover {
    background-color: ${(props: any) => props.theme.hover.primary};
    border-radius: 0.4rem;
  }
  ${(props) =>
    props.isBrandName == true
      ? `
  margin-left: 1rem;
    font-size: 1.3rem
    color: black;
    `
      : `text-decoration: none;
  display: block;
  width: 100%;
  @media screen and (max-width: 768px) {

  color: black;
    width: 100%;
    padding: 1rem 0;


  }


  `}
`;

const HamburgerButton = styled.button`
  border: 0;
  height: 40px;
  width: 40px;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: none;
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translateY(-50%);
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const NavigationMenu = styled.div`
  margin-left: auto;
  z-index: 4;
`;

const NavigationMenuUl = styled.ul<NavExpandedProps>`
  display: flex;
  padding: 0;

  @media screen and (max-width: 768px) {
    display: none;
    position: absolute;
    top: 45px;
    left: 0;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 77px);
    background-color: #ffffff68;
    border-top: 1px solid black;
  }

  ${(props) =>
    props.NavExpanded === true
      ? `
      @media screen and (max-width: 768px) {
        display: block;

      }
      `
      : `@media screen and (max-width: 768px) {
        display: none;

      }`}
`;

const NavigationMenuLi = styled.li`
  list-style-type: none;
  margin: 0 1rem;
  @media screen and (max-width: 768px) {
    text-align: center;
    margin: 0;
  }
`;

export {
  Logo,
  A,
  HamburgerButton,
  NavigationMenu,
  NavigationMenuUl,
  NavigationMenuLi,
};
export default Nav;
