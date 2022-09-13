import * as fcl from "@onflow/fcl";
import Router from "next/router";
import { useState } from "react";
import { NFTStorage } from "nft.storage";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

export default function Submit() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [preview, setPreview] = useState();
  const [ipfsCid, setIpfsCid] = useState();

  const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFTSTORAGE_KEY;
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  async function uploadToIPFS(file) {
    let prev = URL.createObjectURL(file)
    setPreview(prev)
    const cid = await client.storeBlob(file);
    setIpfsCid(cid);
  }

  async function submitProposal() {
    const unixStartTime = +new Date(startTime) / 1000;
    const unixEndTime = +new Date(endTime) / 1000;
    console.log(name, description, ipfsCid, unixStartTime, unixEndTime);
    const transactionId = await fcl.mutate({
      cadence: `
      import Vote from 0xDeployer

      transaction(
          name: String,
          description: String,
          image: String,
          startTime: UFix64,
          endTime: UFix64
      ) {

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
        arg(unixStartTime.toFixed(1), t.UFix64),
        arg(unixEndTime.toFixed(1), t.UFix64)
      ],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999
    });

    console.log('Transaction Id', transactionId);
    Router.push("/")  
  }

  return (
    <div className='flex justify-center pt-20'>
      <div className='w-[70%] space-y-6'>
        <div className='space-y-3 mb-12'>
          <h1 className='text-gray-200 text-2xl text-center font-bold uppercase'>Submit your Proposal</h1>
        </div>
        <div className='flex flex-col space-y-7'>
          <div className='flex flex-col justify-between'>
            <div className="flex flex-col">
              <label className="text-gray-300 text-sm mb-3"> Proposal Title</label>
              <input type="text" placeholder='Should Jacob Tucker receive 1 million dollars?' 
              className='px-7 py-3 w-[80%] focus:outline-none text-gray-200 focus:border-[#38E8C6] 
              bg-[#00344B] border rounded-lg  border-gray-100' onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex space-x-10 pt-8">
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
                  Start Time
                  <input
                    type="datetime-local"
                    className="bg-[#00344B] rounded-lg px-5 py-2"
                    id="start"
                    name="start"
                    onChange={(e) => setStartTime(e.target.value)} />
                </label>
                <label htmlFor="end" className="flex flex-col">
                  End Time
                  <input
                    type="datetime-local"
                    className="bg-[#00344B] rounded-lg px-5 py-2"
                    id="end"
                    name="end"
                    onChange={(e) => setEndTime(e.target.value)} />
                </label>
              </div>
            </div>

          </div>
          <div className="flex flex-col">
            <label className="text-gray-300 text-sm mb-3"> Description</label>
            <textarea className='rounded-lg py-3 px-7 bg-[#00344B] border border-gray-100 focus:outline-none focus:border-[#38E8C6] text-gray-200' rows={8} placeholder='Soo this is how its gonna go...' onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button className='rounded-lg py-3 px-7 text-lg font-semibold bg-[#2bbc9f]' onClick={submitProposal}>Submit Proposal</button>
        </div>
      </div>
    </div>
  )
}
