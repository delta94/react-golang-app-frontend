import React from "react";
import {
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

import { Container } from "./styles";
import Logo from "../../assets/icons/logo.png";

const footer: React.FC = () => {
  return (
    <Container>
      <img src={Logo} alt="cash and grab" />
      <h1>Copyright © 2020 Grab and cash - Todos os direitos reservados</h1>
      <div>
        <TwitterOutlined />
        <InstagramOutlined />
        <FacebookOutlined />
      </div>
    </Container>
  );
};

export default footer;
