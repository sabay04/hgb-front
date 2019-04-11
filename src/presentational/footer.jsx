import React, { Component } from "react";
import { Container, Icon } from "semantic-ui-react";

const Footer = () => {
  return (
    <Container className="footer">
      <div className="footer_elements">
        <Icon size="large" name="instagram" />
        <Icon size="large" name="facebook square" />
        <Icon size="large" name="pinterest square" />
      </div>
    </Container>
  );
};

export default Footer;
