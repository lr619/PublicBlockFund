import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import * as fcl from "@onflow/fcl";
import "../../flow/config.js";
import Navbar from '../../components/NavBar';

export default function Submit() {

  return (
    <div className='bg-[#011E30] flex flex-col min-h-screen'>
      <Head>
        <title>3-VOTING</title>
        <meta name="description" content="Used by Emerald Academy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container mx-auto flex-1 p-5'>
        <Navbar />
        
        <div className='flex justify-center pt-20'>
            <div className='w-[70%] space-y-6'>
                <div className='space-y-3 mb-12'>
                    <h1 className='text-gray-200 text-2xl text-center font-bold uppercase'>Submit your Proposal</h1>
                    <p className='text-gray-400 text-lg font-semibold text-center'>
                        Submit your very own proposal and have people vote on it.
                    </p>
                </div>
                <div className='flex flex-col space-y-7'>
                <div className='flex justify-between'>
                    <input type="text" placeholder='name of proposal' className='px-7 py-3 w-[80%] focus:outline-none text-gray-200 focus:border-[#38E8C6]  bg-[#00344B] border rounded-lg  border-gray-100' />
                    <div className='flex items-center justify-end'>
                        <input type="text" placeholder='0' className='px-7 py-3  text-center w-[30%] focus:outline-none text-gray-200 focus:border-[#38E8C6]  bg-[#00344B] border rounded-lg  border-gray-100' />
                        <p className='text-xl font-semibold text-gray-300 px-2'>Days</p>
                    </div>
                </div>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <textarea className='rounded-lg py-3 px-7 bg-[#00344B] border border-gray-100 focus:outline-none focus:border-[#38E8C6] text-gray-200' rows={10} placeholder='Describe proposal here' />
                <button className='rounded-lg py-3 px-7 text-lg font-semibold bg-[#2bbc9f]'>Submit Proposal</button>
                </div>
            </div>
        </div>

      </main>
      
      
      <footer>
        <img className="w-full" src='/city.svg' alt='city' />
        <div className='bg-black flex pt-10 pb-5 justify-center text-white'>
          <div className='w-[80%] flex justify-between items-center'>
            <div className='font-jet text-xs'>2022. All rights reserved.</div>
            <a className='flex items-center text-[#38E8C6] hover:underline hover:underline-offset-2 space-x-1 font-poppins text-lg' href='https://academy.ecdao.org/'><h1>Emerald</h1>
              <img src='/EC_Education.png' width={40} alt='city' />
              <h1>Academy</h1></a>
            <div className='font-jet text-xs'>Created by <a href='https://discord.gg/emeraldcity' className='text-[#38E8C6] hover:underline hover:underline-offset-2 '>Emerald City DAO</a></div>
          </div>
        </div>
      </footer>
    </div>

  )
}
