import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import * as fcl from "@onflow/fcl";
import "../flow/config.js";
import Navbar from '../components/NavBar';

export default function Home() {

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
          <div className='space-y-10 p-2 w-1/2 text-center'>
            <h1 className='text-gray-400 mb-10 font-semibold text-2xl'>
              Welcome to the coolest Voting tutorial out on the market right now, brought to you by none other than the greatest DAO on the flow blockchain... <a className='text-[#38E8C6] underline' href='https://www.ecdao.org/'>Emerald City Dao</a>
            </h1> 
            <Link href='/proposals'>
              <a className='pt-10'>
                <button className='bg-[#38E8C6] rounded-full text-lg text-center py-2 px-12'>Enter Dapp</button> 
              </a>
            </Link>
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


