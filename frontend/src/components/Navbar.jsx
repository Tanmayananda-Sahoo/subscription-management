import React from 'react'

const Navbar = () => {
  return (
    // <div className='h-auto w-screen bg-amber-200 flex justify-center'>
      <div className='h-[7vh] w-[35vw] bg-[#0B0C0D] flex items-center text-white rounded-full align-center justify-between font-medium text-md fixed top-4 mx-auto shadow-lg left-1/2 transform -translate-x-1/2'>
        <a href="/" className='cursor-pointer w-[25%]   h-full flex items-center justify-center rounded-full hover:bg-white hover:text-black transition all ease-out duration-500'>
          Home
        </a>
        <a href="/add" className='cursor-pointer w-[25%]   h-full flex items-center justify-center rounded-full hover:bg-white hover:text-black transition all ease-out duration-500'>
          Add
        </a>
        <a href="/delete" className='cursor-pointer w-[25%]   h-full flex items-center justify-center rounded-full hover:bg-white hover:text-black transition all ease-out duration-500'>
          Delete
        </a>
        <a href="/account" className='cursor-pointer w-[25%]   h-full flex items-center justify-center rounded-full hover:bg-white hover:text-black transition all ease-out duration-500'>
          Account
        </a>

      </div>
    // </div>
  )
}

export default Navbar