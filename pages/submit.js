import "../flow/config.js";

export default function Submit() {

  return (
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
  )
}
