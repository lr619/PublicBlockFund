import * as React from "react";
import styled from "styled-components";

export const Card = ({info}) => {
  return (
    <Div>
      <Div2> {info.title}</Div2>
      <Div3>{info.description}</Div3>
      <Button>Donate Now</Button>
    </Div>
  );
};

const Div = styled.div`
  border-radius: 30px;
  background: linear-gradient(145deg, #9997ff 0%, #40344f 100%);
  display: flex;
  flex-direction: row;
  height: 400px;
  width: 600px;
  flex-direction: column;
  padding: 20px;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 991px) {
    max-width: 100%;
    padding-right: 20px;
  }
`;

const Div2 = styled.div`
  font: 35px Convergence, sans-serif;
  color: #fff;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div3 = styled.div`
  margin-top: 50px;
  font: 20px Convergence, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Button = styled.button`
  border-radius: 30px;
  background-color: rgba(153, 151, 255, 1);
  margin-top: 60px;
  color: #fff;
  justify-content: center;
  padding: 21px 0;
  font: 25px Convergence, sans-serif;
  width: 100%;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 10px;
`;
