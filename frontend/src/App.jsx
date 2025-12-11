import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import AddPage from './Pages/AddPage.jsx'
import { Routes, Route } from 'react-router-dom'
import DeletePage from './Pages/DeletePage.jsx'
import Account from './Pages/Account.jsx'
import authStore from './stores/authStore.js'
import Login from './Pages/LoginPage.jsx'


const App = () => {
  const {checkAuth, authUser} = authStore();
  useEffect(() => {
    checkAuth();
  },[checkAuth]);
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser? <Dashboard />:<Login />} />
        <Route path="/add" element={authUser? <AddPage />:<Login />} />
        <Route path="/delete" element={authUser? <DeletePage />:<Login />} />
        <Route path="/account" element={authUser? <Account />:<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
      </Routes>
    </>
  )
}

export default App