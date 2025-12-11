import { axiosInstance } from "../utils/axios.js";
import { create } from "zustand";
const subscriptionStore = create((set, get) => ({
  isAdding: false,
  isFetching: true,
  allSubscriptions: [],
  fetchedSubscriptions: [],
  totalAmount: 0,
  addSubscription: async(formData) => {
    try{
      set({isAdding: true});
      const response = await axiosInstance.post('/subscriptions/register',formData);
      set((state) => {allSubscriptions: [...state.allSubscriptions, response.data.subscription]})
    } catch(error) {
      console.error("Error adding subscription:", error);
    } finally {
      set({isAdding: false});
    }
  },
  fetchSubscriptions: async() => {
    try {
      set({isFetching: true})
      const subscriptions = await axiosInstance.get('/subscriptions/fetch-subscriptions');
      set({fetchedSubscriptions: subscriptions.data.subscriptions});
    } catch(error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      set({isFetching: false})
    }
  },
  
  calcTotalAmount: async() => {
    const subscriptionList = get().fetchedSubscriptions;
    let sum = 0;
    subscriptionList.forEach((field) => {
      sum = sum + field.amount;
    })
    set({totalAmount: sum});
  },

  deleteSubscription: async(id) => {
    const response = await axiosInstance.delete(`/subscriptions/cancel/${id}`);
    console.log('Deleted bhai');
  }
}))

export default subscriptionStore