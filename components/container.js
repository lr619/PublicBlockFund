import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  background-color: #18072b;
  color: #fff;
  font-weight: 400;
  padding: 80px 60px 24px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;
const Div = styled.div`
  display: flex;
  margin-top: 161px;
  width: 100%;
  max-width: 1093px;
  flex-direction: column;
  align-items: center;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;
