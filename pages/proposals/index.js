import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import * as fcl from "@onflow/fcl";
import "../../flow/config.js";
import Navbar from '../../components/NavBar';

export default function Proposals() {

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
                    <h1 className='text-gray-200 text-2xl font-bold'>Welcome to YOUR DAO.</h1>
                    <p className='text-gray-400 text-lg font-semibold '>
                        Here you can view all proposals submitted by fellow token holders and also submit your very own proposal as well. 
                        You would need a minimum of * tokens to submit a proposal.
                    </p>
                </div>
                <div className='flex items-center justify-between mb-7'>
                    <h1 className='text-gray-200 text-2xl font-bold'>Proposals</h1>
                    <Link href='/proposals/submit'>
                        <a className='rounded-lg font-semibold text-md py-2 px-6 bg-gray-300'>Submit Proposal</a>
                    </Link>
                </div>  
                <div>
                <Link href='/proposals/id'>
                    <a>
                    <div className='rounded-lg bg-[#00344B] text-white hover:bg-[#0f4962] flex cursor-pointer items-center py-4 px-9 justify-between'>
                        <div className='flex items-center space-x-3'>
                            <p className='text-xl font-semibold text-gray-300'>3.</p>
                            <h2 className='text-xl font-semibold text-gray-200'>Get a new puppy as the dao pet and mascot</h2>
                            <p className='text-sm text-gray-400'>expires in 2 days</p>
                        </div>
                        <div className='rounded-lg py-2 px-6 bg-green-600'>Executed</div>
                    </div>
                    </a>
                </Link>
                </div>
                <div className='rounded-lg bg-[#00344B] text-white hover:bg-[#0f4962] flex cursor-pointer items-center py-4 px-9 justify-between'>
                    <div className='flex items-center space-x-3'>
                        <p className='text-xl font-semibold text-gray-300'>2.</p>
                        <h2 className='text-xl font-semibold text-gray-200'>Get a new puppy as the dao pet and mascot</h2>
                        <p className='text-sm text-gray-400'>expires in 2 days</p>
                    </div>
                    <div className='rounded-lg py-2 px-6 bg-[#2bbc9f]'>Ongoing</div>
                </div>
                <div className='rounded-lg bg-[#00344B] text-white hover:bg-[#0f4962] flex cursor-pointer items-center py-4 px-9 justify-between'>
                    <div className='flex items-center space-x-3'>
                        <p className='text-xl font-semibold text-gray-300'>1.</p>
                        <h2 className='text-xl font-semibold text-gray-200'>Get a new puppy as the dao pet and mascot</h2>
                        <p className='text-sm text-gray-400'>expires in 2 days</p>
                    </div>
                    <div className='rounded-lg py-2 px-6 bg-red-500'>Declined</div>
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
