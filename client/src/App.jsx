import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Discover, LogIn, Profile, SignUp, Search, NotFound } from './containers'
import { Navbar, Message, Footer } from './components'

function App() {
  return (
    <>
      <Navbar />
      <Message />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/discover' element={<Discover />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
