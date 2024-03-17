import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import "../flow/config";
import styles from '../styles/Home.module.css'
import styled from "styled-components";

export default function Navbar() {
  const { user, logOut, logIn, balance } = useAuth();

  return (
    <ContentWrapper>
        <AddressWrapper>
          <div className='flex space-x-4 items-center'>
            <h1 className='text-[black]'>Address: </h1>
            <h1 className='border px-7 text-center text-[black] text-sm py-1 rounded-xl border-[black] w-56'>{user.loggedIn ? user.addr : "Please connect wallet"}</h1>
          </div>
        </AddressWrapper>
        <Link href="/">
          <ImgWrapper>
            <Img src="/BlockFundFinal.png" ></Img>
            <Itext>BlockFund</Itext>
          </ImgWrapper>
        </Link>
        <LoginButton>{!user.loggedIn ? <button onClick={logIn}>Connect</button> : <button onClick={logOut}>Logout</button>}
        </LoginButton>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  background-color:white;
  display:flex;
  flex-direction:row;
  width:98.8vw;
  justify-content:space-between;
  height:100px;
  align-items:center;
  color:black;
  `


  const Img = styled.img`
  width: 20%;
  height: auto;
`;
const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10%;
  `


const Itext = styled.div`
  color:black;
  font-weight:bold;
  font-decoration:none;
  font-size:2rem;
`
const LoginButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
  font-weight: bold;
  font-size: 1.5rem;
  background-color:black;
  color:white;
  border-radius: 10px;
  height:30%;
  justify-content:center;
  padding:20px;
`

const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 20px;
  `