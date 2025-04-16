import React from "react";
import styled from "styled-components";
import { Send } from "@mui/icons-material";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fcf5f5;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })};
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })};
`;
const Input = styled.input`
  border: none;
  fles: 5;
  padding-left: 20px;
  width: 100%;
`;
const Button = styled.button`
  flex: 1;
  color: white;
  background-color: teal;
  border: none;
  cursor: pointer;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>
        Get timely updates from your favorite products. ❤️
      </Description>
      <InputContainer>
        <Input placeholder="your email..." />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
