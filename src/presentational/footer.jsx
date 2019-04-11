import React, { Component } from "react";
import { Container, Icon } from "semantic-ui-react";

const Footer = () => {
  return (
    <Container className="footer">
      <div className="footer_elements">
        <Icon name="instagram" />
        <Icon name="facebook square" />
        <Icon name="pinterest square" />
      </div>
    </Container>
  );
};

export default Footer;
