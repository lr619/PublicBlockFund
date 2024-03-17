import React from "react";
import styled from "styled-components";
import { NavBar } from "./NavBar";
const Div = styled.div`
  background-color: #18072b;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-weight: 400;
  padding: 80px 60px 24px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const Div2 = styled.div`
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

const Div3 = styled.div`
  text-align: center;
  font-weight: 900;
  font-size: 96px;
  font-family: Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
  }
`;

const Div4 = styled.div`
  text-align: center;
  margin-top: 35px;
  font-size: 32px;
  font-family: Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Img = styled.img`
  aspect-ratio: 1.06;
  object-fit: auto;
  object-position: center;
  width: 557px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-top: 46px;
  max-width: 100%;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Div5 = styled.div`
  text-align: center;
  margin-top: 62px;
  font-size: 40px;
  font-family: Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Div6 = styled.div`
  justify-content: center;
  border-radius: 50px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #9997ff;
  margin-top: 63px;
  color: #000;
  padding: 30px 54px 17px;
  font-weight: 600;
  font-size: 64px;
  font-family: Inter, sans-serif;
  @media (max-width: 991px) {
    font-size: 40px;
    max-width: 100%;
    margin-top: 40px;
    padding: 0 20px;
  }
`;

const Div7 = styled.div`
  border-radius: 30px;
  background-color: rgba(64, 52, 79, 1);
  align-self: stretch;
  margin-top: 63px;
  padding: 26px 13px 51px;
  font-size: 32px;
  font-family: Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

export const LandFrame = () => {
  return (
    <>
      <NavBar />
      <Div>
        <Div2>
          <Div3>BlockFund</Div3>
          <Div4>
            A revolutionary platform that harnesses the power of blockchain
            technology to bring transparency, security, and efficiency to
            charitable giving.
            <br />
          </Div4>
          <Img loading="lazy" srcSet="Home.png" />
          <Div5>
            <span style={{ fontWeight: 700, color: "rgba(255,255,255,1)" }}>
              Our Mission:
            </span>
            <br />
            To empower donors and beneficiaries by providing a transparent,
            secure, and direct channel for charitable transactions.
          </Div5>
          <Div6>Support Now</Div6>
          <Div7>
            <span style={{ fontWeight: 700, color: "rgba(255,255,255,1)" }}>
              How It Works:
            </span>
            <ul>
              <li>
                Create a Campaign: Users can set up a fundraising campaign with
                a few simple steps, outlining their story and the goal they wish
                to achieve.
              </li>
            </ul>
            <ul>
              <li>
                Blockchain Security: Each donation is processed through a
                decentralized blockchain network, ensuring security and
                transparency.
              </li>
            </ul>
            <ul>
              <li>
                Smart Contracts: Funds are held in smart contracts until the
                campaign goal is met, guaranteeing that the funds are only used
                for their intended purpose.
              </li>
            </ul>
            <ul>
              <li>
                Direct Support: Donors can send funds directly to the cause they
                want to support, with no intermediaries, ensuring that the
                maximum possible amount goes to the cause.
              </li>
            </ul>
            <ul>
              <li>
                Global Reach: BlockFund makes it possible for campaigns to
                receive donations from all over the world, expanding the
                potential support base beyond geographical boundaries.
              </li>
            </ul>
          </Div7>
        </Div2>
      </Div>
    </>
  );
};
