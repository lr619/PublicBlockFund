import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledNavBar = styled.div`
  background-image: url(./rectangle-2.png);
  background-size: 100% 100%;
  height: 200px;
  position: relative;
  width: 1440px;

  & .text-wrapper {
    color: #ffffff;
    font-family: "Inter-Regular", Helvetica;
    font-size: 36px;
    font-weight: 400;
    left: 914px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 77px;
    width: 213px;
  }

  & .div {
    -webkit-text-stroke: 1px #18072b;
    color: #ffffff;
    font-family: "Inter-Regular", Helvetica;
    font-size: 36px;
    font-weight: 400;
    left: 425px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 76px;
    width: 106px;
  }

  & .text-wrapper-2 {
    color: #ffffff;
    font-family: "Inter-Regular", Helvetica;
    font-size: 36px;
    font-weight: 400;
    left: 606px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 79px;
    width: 248px;
  }

  & .rectangle {
    height: 200px;
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 200px;
  }

  & .group {
    height: 77px;
    left: 1178px;
    position: absolute;
    top: 64px;
    width: 202px;
  }

  & .overlap-group {
    background-color: #9997ff;
    border-radius: 40px;
    height: 77px;
    position: relative;
    width: 200px;
  }

  & .text-wrapper-3 {
    color: #301a48;
    font-family: "Inter-Regular", Helvetica;
    font-size: 36px;
    font-weight: 400;
    left: 51px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 16px;
    width: 99px;
  }
`;

export const NavBar = ({ className, rectangle = "rectangle-3.png" }) => {
  return (
    <StyledNavBar className={`nav-bar ${className}`}>
      <div className="text-wrapper">Create Fund</div>
      <div className="div">About</div>
      <div className="text-wrapper-2">Browse Funds</div>
      <img className="rectangle" alt="Rectangle" src={rectangle} />
      <div className="group">
        <div className="overlap-group">
          <div className="text-wrapper-3">Login</div>
        </div>
      </div>
    </StyledNavBar>
  );
};

NavBar.propTypes = {
  rectangle: PropTypes.string,
};
