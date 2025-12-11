import React from 'react'
import useSubscriptionStore from '../stores/subscriptionStore.js';
const AddPage = () => {
  const [title, setTitle] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');
  const [category, setCategory] = React.useState('');

  const {isAdding, addSubscription} = useSubscriptionStore();

  const handleFormData = () => {
    const formData = {
      title,
      amount,
      dueDate,
      period: category
    }
    addSubscription(formData);
    setTitle(" ");
    setAmount(" ");
    setDueDate(" ");
    setCategory(" ");
  }
  return (
    <div className='flex justify-center mt-20 w-screen h-auto'>
      <div className="h-auto px-4 flex flex-col justify-between items-center gap-2 mt-20 pt-4 pb-8 w-[50vw] shadow-md rounded-lg">
        <h1 className='text-4xl font-semibold tracking-tighter mb-6'>Add Subscription</h1>
          <form>
            <input 
            value={title}
            type="text" 
            placeholder="Subscription Name" 
            className="border-2 border-gray-300 rounded-md p-2 w-80 mb-4 transistion all ease-out duration-1000"
            onChange={(e) => setTitle(e.target.value)}
            />
            <br/>
            <input 
            type="number" 
            placeholder="Amount" 
            className="border-2 border-gray-300 rounded-md p-2 w-80 mb-4 transistion all ease-out duration-1000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            />
            <br/>
            <input 
            type='date' 
            placeholder='Due Date' 
            className="border-2 border-gray-300 rounded-md p-2 w-80 mb-4 transistion all ease-out duration-1000 text-gray-500"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            />
            <br/>
            <select 
            placeholder="Category" 
            className="border-2 border-gray-300 rounded-md p-2 w-80 mb-4 transistion all ease-out duration-1000 text-gray-500"
            onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Monthly">Monthly</option>
              <option value="Quaterly">Quaterly</option>
              <option value="Half a month">Half a month</option>
              <option value="Yearly">Yearly</option>
              <option value="Category"disabled selected hidden>Category</option>
            </select>
          </form>
          <button
          onClick={handleFormData}
          type="submit" 
          className="bg-zinc-900 text-white px-6 py-2 rounded-md cursor-pointer transistion all ease-out duration-300 h-12 mt-10">Add Subscription</button>
        </div>
    </div>
  )
}

export default AddPage