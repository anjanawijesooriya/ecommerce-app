import React from "react";
import styled from "styled-components";

const Announcement = () => {
  const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-wight: 500;
  `;

  return <Container>Super Deal! Free Shipping on Orders Over $50</Container>;
};

export default Announcement;
