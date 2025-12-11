import React from 'react'
import authStore from '../stores/authStore.js';
const Account = () => {
  const { authUser, logout } = authStore();
  console.log(authUser);
  return (
    <>
      <div className='py-4 flex gap-10 justify-end px-20'>
        <button
          className='px-8 py-2 bg-zinc-900 rounded-md text-white font-semibold tracking-tighter cursor-pointer'
        >Update</button>
        <button
          className='px-8 py-2 bg-red-500 rounded-md text-white font-semibold tracking-tighter cursor-pointer'
          onClick={logout}
        >Logout</button>
      </div>
      <div className="px-20">
        <h1 className="text-5xl font-bold tracking-tighter">Your Profile</h1>
        <div>
          <div className='flex items-end mt-8 gap-2'>
            <h2 className='text-2xl font-semibold'>Username:</h2>
            <h5 className='text-xl font-normal'>{authUser?.username}</h5>
          </div>
          <div className='flex items-end mt-2 gap-2'>
            <h2 className='text-2xl font-semibold'>Email:</h2>
            <h5 className='text-xl font-normal'>{authUser?.email}</h5>
          </div>
          <p className='text-md font-light mt-8'>Member since: {new Date(authUser?.createdAt).toLocaleDateString()}</p>
        </div>

      </div>
    </>
  )
}

export default Account