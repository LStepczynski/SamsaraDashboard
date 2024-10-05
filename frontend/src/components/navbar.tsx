import styled from "styled-components";

const NavbarCore = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80px;
  background-color: #0e0f1a;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const NavbarLink = styled.a`
  text-decoration: none;
  padding-right: 40px;
  font-weight: bold;
  color: #4842ed;
  font-size: 20px;
`;

export const NavBar = () => {
  return (
    <NavbarCore>
      <NavbarLink href="/">Fuel</NavbarLink>
      <NavbarLink href="/hos">HOS</NavbarLink>
      <NavbarLink href="/assets">Assets</NavbarLink>
    </NavbarCore>
  );
};
