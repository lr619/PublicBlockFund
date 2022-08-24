import Link from 'next/link'

export default function Home() {

  return (
    <div className='flex justify-center pt-20'>
      <div className='w-[70%] space-y-6'>
        <div className='space-y-3 mb-12'>
          <h1 className='text-gray-200 text-2xl font-bold'>Welcome to your DAO</h1>
          <p className='text-gray-400 text-lg font-semibold '>
            Here you can view all proposals submitted by fellow token holders and also submit your very own proposal as well.
            You would need a minimum of * tokens to submit a proposal.
          </p>
        </div>
        <div className='flex items-center justify-between mb-7'>
          <h1 className='text-gray-200 text-2xl font-bold'>Proposals</h1>
          <Link href='/submit'>
            <a className='rounded-lg font-semibold text-md py-2 px-6 bg-gray-300'>Submit Proposal</a>
          </Link>
        </div>
        <div>
          <Link href='/id'>
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
  )
}


