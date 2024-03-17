import * as fcl from "@onflow/fcl";
import Link from 'next/link';

import Router from "next/router";
import { useAuth } from "../contexts/AuthContext";

import { useState,useEffect } from "react";
import { NFTStorage } from "nft.storage";
import DepositModal from '../components/Deposit';
import { Dialog, Transition } from '@headlessui/react';

import styled from "styled-components";

import { CohereClient } from "cohere-ai";

export default function Submit() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [preview, setPreview] = useState();
  const [ipfsCid, setIpfsCid] = useState();
  const [apiResponse, setApiResponse] = useState();


  const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFTSTORAGE_KEY;
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  


  async function uploadToIPFS(file) {
    let prev = URL.createObjectURL(file)
    setPreview(prev)
    const cid = await client.storeBlob(file);
    setIpfsCid(cid);
  }

  async function submitProposal() {
    const startTime = Date.now() / 1000;
    const endTime = +new Date(startTime) / 1000;
    console.log(description);
    console.log(name, description, ipfsCid, startTime, endTime);
    const transactionId = await fcl.mutate({
      cadence: `
      import Vote from 0xDeployer
      
      transaction(name: String, description: String, image: String, startTime: UFix64, endTime: UFix64) {
        let Admin: &Vote.Admin
        
        prepare(signer: AuthAccount) {
          self.Admin = signer.borrow<&Vote.Admin>(from: Vote.AdminPath) ?? panic("This signer is not an Admin and cannot make proposals!")
        }
        
        execute {
          self.Admin.createProposal(name: name, description: description, image: image, startTime: startTime, endTime: endTime)
        }
      }
      `,
      args: (arg, t) => [
        arg(name, t.String),
        arg(description, t.String),
        arg(ipfsCid, t.String),
        arg(startTime, t.UFix64),
        arg(endTime, t.UFix64)
      ],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999
    });

    console.log('Transaction Id:', transactionId);
    Router.push("/");
  
  }
    
  async function fetchCohereData() {
    try {
      console.log(name);
      const response = await fetch('/api/cohereData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchTerm: name })
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      setDescription(data.data); // Set the fetched description
      console.log("Received description:", data.data);
      
      // After successfully fetching and setting description, proceed to create the proposal
      await createProposal();
    } catch (error) {
      console.error("Fetching description failed:", error);
    }
  }
    


  return (
    <ContentWrapper>
        <Title className='space-y-3 mb-12'>
          <h1 className='text-gray-200 text-2xl text-center font-bold uppercase'>What is your reason for fundraising?</h1>
        </Title>
        <SubContentWrapper>
            <TitileAndInput>
              <label className="text-gray-300 text-sm mb-3"> Proposal Title</label>
              <input type="text" placeholder='What is the title for your Block Fund?'
                className='px-7 py-3 w-[80%] focus:outline-none text-black-200 focus:border-[white] 
              bg-[white] border rounded-lg  border-gray-100' onChange={(e) => setName(e.target.value)} />
            </TitileAndInput>
            <ImgAndStartTime>
              <div className="flex flex-col w-1/3">
                <label className="border rounded-xl h-48 flex items-center cursor-pointer justify-center text-white overflow-hidden" htmlFor="upload-button">
                  {
                    preview ? <img src={preview} className="rounded-xl" alt="dummy" width="300" height="300" /> :
                      <h1>upload image</h1>
                  }
                </label>
                <input className="hidden" id="upload-button" type="file" onChange={(e) => uploadToIPFS(e.target.files[0])} />
              </div>
              <div className='flex flex-col space-y-12 pl-10 text-gray-300 text-sm'>
                <label htmlFor="start" className="flex flex-col">
                  Deadline
                  <input
                    type="datetime-local"
                    className="bg-[white] rounded-lg px-5 py-2"
                    id="start"
                    name="start"
                    onChange={(e) => setStartTime(e.target.value)} />
                </label>

              </div>
            </ImgAndStartTime>

            </SubContentWrapper>
          <Description>
            <label className="text-gray-300 text-sm mb-3"> Description</label>
            <StyledTextarea
      rows={8}
      placeholder='This is a vote to determine if Jacob Tucker should be given 1 million dollars...'
      onChange={(e) => setDescription(e.target.value)}
    />          </Description>
          <SubmitButton className='rounded-lg py-3 px-7 text-lg font-semibold bg-[white]' onClick={submitProposal}>Submit Block Fund</SubmitButton>
    </ContentWrapper>
  )
}

const ContentWrapper = styled.div`
  background-color:#1a1d25;
  width:98.8vw;
  justify-content:center;
  height:180vh;
  align-items:center;
  text-align:center;
  display:flex;
  flex-direction:column;
  `

  const Title = styled.div`
  color:white;
  font-weight:bold; 
  width:80%; `
  

  const SubContentWrapper = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100%;
  padding-bottom:2rem;
  `
  const TitileAndInput = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:70%;
  `
  const ImgAndStartTime = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  width:70%;
  height:100%;
  padding-top:5%;
  `

  const Description = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100%;
  `
  

  const StyledTextarea = styled.textarea`
  width:60%;
  height:100%;
  border-radius: 0.75rem; /* rounded-lg */
  padding: 2rem; /* py-20 px-15, adjusted for actual CSS values */
  background-color: white; /* bg-[#00344B] */
  border: 1px solid #e2e8f0; /* border border-gray-100 */
  outline: none; /* focus:outline-none */
  &:focus {
    border-color: #38E8C6; /* focus:border-[#38E8C6] */
  }
  color: black; /* text-gray-200 */
  font-family: inherit; /* Assuming you want the font to be consistent with the rest of your app */

`;

const SubmitButton = styled.button`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:20%;
  margin-top:5%;
  background-color:#E6E6FA;
  `
            <button onClick={fetchCohereData} className='rounded-lg py-2 px-4 text-md font-semibold bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-150 ease-in-out mb-4'>Autogenerate Description</button>
            <textarea className='rounded-lg py-3 px-7 bg-[#00344B] border border-gray-100 focus:outline-none focus:border-[#38E8C6] text-gray-200' rows={8} placeholder={description || 'If left empty our Generative AI will fill in the desciption itself'} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button className='rounded-lg py-3 px-7 text-lg font-semibold bg-[#2bbc9f]' onClick={submitProposal}>Submit Proposal</button>
        </div>
      </div>
    </div>
  )
}
