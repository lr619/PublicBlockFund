import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import * as fcl from "@onflow/fcl";
import "../../flow/config.js";
import Navbar from '../../components/NavBar';

export default function Id() {

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
                <div className='flex mb-12 justify-between'>
                    <div>
                        <h1 className='text-gray-200 text-3xl font-bold'>This will be the title of the Proposal</h1>
                        <p className='text-gray-300 opacity-75'>Proposal submitted by: 0x001</p>
                    </div>
                    
                    <div className='text-gray-400 text-lg font-semibold pr-2'>
                        <p>for: 2</p>
                        <p>Against: 2</p>
                        <p>Abstain: 2</p>
                    </div>
                </div>
                <div className='flex items-center justify-between mb-7'>
                    <h1 className='text-gray-200 text-2xl font-bold'>Proposal:</h1>
                    <div className='space-x-4'>
                        <button className='rounded-lg font-semibold text-md py-2 px-6 text-white bg-green-500'>For</button>
                        <button className='rounded-lg font-semibold text-md py-2 px-6 text-white bg-red-500'>Against</button>
                        <button className='rounded-lg font-semibold text-md py-2 px-6 bg-gray-300'>Abstain</button>
                    </div>
                </div>   
                <div className='rounded-lg bg-[#00344B] text-white hover:bg-[#0f4962] flex cursor-pointer items-center justify-center py-28 px-9 '>
                    <div>Image will be here</div>
                </div>
                <div className='text-gray-300 opacity-75 text-xl'>
                Contrary to popular belief, Lorem Ipsum is not simply random text. 
                It has roots in a piece of classical Latin literature from 45 BC,
                 making it over 2000 years old. Richard McClintock, a Latin professor 
                 at Hampden-Sydney College in Virginia, looked up one of the more 
                 obscure Latin words, consectetur, from a Lorem Ipsum passage, and 
                 going through the cites of the word in classical literature,
                  discovered the undoubtable source. Lorem Ipsum comes from 
                  sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" 
                  (The Extremes of Good and Evil) by Cicero, written in 45 BC. 
                  This book is a treatise on the theory of ethics, very popular 
                  during the Renaissance. The first line of Lorem Ipsum, 
                  "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
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
