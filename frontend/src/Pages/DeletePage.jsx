import React from 'react'
import subscriptionStore from '../stores/subscriptionStore.js'
const DeletePage = () => {
  const { fetchSubscriptions, fetchedSubscriptions, deleteSubscription } = subscriptionStore();
  React.useEffect(() => {
    fetchSubscriptions();
  }, [fetchedSubscriptions])

  const deleteHandler = (id) => {
    deleteSubscription(id);
  }
  return (
    <div className='h-auto mt-20 flex justify-around gap-8 px-15 py-8 flex-wrap'>
      {
        fetchedSubscriptions.map((subscription, index) => {
          return (<div key={subscription._id} className='min-w-[20vw] border-2 border-zinc-300 rounded-md px-2 py-2'>
            <div className='flex justify-end w-full'>
              <button key={subscription._id} className='px-8 py-2 bg-red-500 rounded-md text-white font-semibold tracking-tighter cursor-pointer'
              onClick = {(e) => deleteHandler(subscription._id)}
              >Delete</button>
            </div>
            <div className='px-10 py-4'>
              <h3 className='text-3xl font-medium'>{subscription.title} </h3>
              <h3 className='font-medium'>Rs. {subscription.amount}</h3>
            </div>
          </div>)

        })
      }

    </div>
  )
}

export default DeletePage