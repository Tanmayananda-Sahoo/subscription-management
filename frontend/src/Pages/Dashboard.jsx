import React, { useEffect } from 'react'
import Navbar from '../components/Navbar.jsx';
import authStore from '../stores/authStore.js';
import subscriptionStore from '../stores/subscriptionStore.js';
const Dashboard = () => {
  const {logout} = authStore();
  const {fetchedSubscriptions, fetchSubscriptions, calcTotalAmount, totalAmount, isFetching, isAdding} = subscriptionStore();
  useEffect(() => {
    fetchSubscriptions();
    calcTotalAmount();
  },[fetchedSubscriptions]);

  return (
    <>
      <div className='py-4 flex justify-end px-20'>
        <button 
        className='px-8 py-2 bg-red-500 rounded-md text-white font-semibold tracking-tighter cursor-pointer'
        onClick={logout}
        >Logout</button>
      </div>
      <div className="h-auto px-20 flex justify-between gap-8 py-8">
        <div className='h-[24vh] w-[28vw] bg-white rounded-md border-gray-200 border-2 p-4 shadow-md flex flex-col items-start gap-4'>
          <h1 className='text-2xl font-semibold uppercase'>Total Bills pending: </h1>
          <h2 className='text-4xl font-bold'>{totalAmount}</h2>
        </div>
        <div className='h-[24vh] w-[28vw] bg-white rounded-md border-gray-200 border-2 p-4 shadow-md flex flex-col items-start gap-8'>
          <h1 className='text-2xl font-semibold uppercase'>Upcoming Bill: </h1>
          <h2 className='text-3xl font-medium uppercase'>{fetchedSubscriptions.length > 0 ? fetchedSubscriptions[0].title: " "}</h2>
        </div>
        <div className='h-auto w-[28vw] bg-white rounded-md border-gray-200 border-2 p-4 pl-8 shadow-md flex flex-col items-start gap-8 '>
          <h1 className='text-xl font-semibold uppercase'>Upcoming subscriptions this month: </h1>
          <div>
            {
              fetchedSubscriptions.map((subscription, index) => {
                return (<div key={subscription._id}>
                  <h3 className='text-2xl font-medium'>{subscription.title}: </h3>
                  <h3 className='font-medium'>Rs. {subscription.amount}</h3>
                </div>)

              })
            }
            </div>
        </div>
        
      </div>

    </>
  )
}

export default Dashboard