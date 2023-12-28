import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Container, Button, Image, Search } from "semantic-ui-react";
import Logo from "../assets/logo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Menu
      inverted
      borderless
      style={{ padding: "0.3rem", marginButtom: "20px" }}
      attached
    >
      <Container>
        <Menu.Item name="home">
          <Image size="mini" src={Logo} alt="logo" />
        </Menu.Item>
        <Menu.Item>
          <h2>Mading JeWePe</h2>
        </Menu.Item>
        <Menu.Item position="right">
          <Button
            style={{ margin: "20px" }}
            size="medium"
            primary
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
