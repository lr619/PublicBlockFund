
import React from "react";
import styled from "styled-components";

const StyledSupportButton = styled.div`
  background-color: #9997ff;
  border-radius: 50px;
  box-shadow: 0px 4px 4px #00000040;
  height: 107px;
  overflow: hidden;
  position: relative;
  width: 508px;

  & .text-wrapper {
    color: #000000;
    font-family: "Inter-SemiBold", Helvetica;
    font-size: 64px;
    font-weight: 600;
    left: 51px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 14px;
  }
`;

export const SupportButton = ({ className }) => {
  return (
    <StyledSupportButton className={`support-button ${className}`}>
      <div className="text-wrapper">Support Now</div>
    </StyledSupportButton>
  );
};