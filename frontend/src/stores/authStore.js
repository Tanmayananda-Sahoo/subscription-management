import {axiosInstance} from "../utils/axios.js";
import {create} from "zustand";

const authStore = create((set)=> ({
  isLoggingIn: false,
  isSigningUp: false,
  authUser: null,

  login: async(formData) => {
    try{
      set({isLoggingIn: true});
      const response = await axiosInstance.post("/user/login", formData);
      console.log("Reponse after authUser:", response);
      set({authUser: response.data.user});
      console.log("Auth User:", authUser);
    } catch(error) {
      console.log("Login Error: ", error);
    } finally {
      set({isLoggingIn: false});
    }
  },

  register: async() => {
    try{
      set({isSigningUp: true});
      const response = await axiosInstance.post("/user/register");
      set({authUser: response.data.user});
      console.log("Auth User after signing up: ",authUser);
    } catch(error) {
      console.log("Signup error: ",error);
    } finally {
      set({isSigningUp: false});
    }
  },

  logout: async() => {
    try {
      await axiosInstance.post("/user/logout");
      set({authUser: null});
    } catch(error) {
      console.log("Error in logout: ",error);
    }
  },
  checkAuth: async() => {
    try {
      const response = await axiosInstance.get("/user/check-auth");
      set({authUser: response.data.user});
    } catch (error) {
      console.log("Error in authenticating user: ",error);
    }
  }
})
)


export default authStore;