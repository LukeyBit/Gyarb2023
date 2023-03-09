import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Discover, LogIn, Profile, SignUp, Search, NotFound, Recipe } from './containers'
import { Navbar, Message, Footer, ProtectedRoute } from './components'

function App() {
  return (
    <>
      <Navbar />
      <Message />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/' element={<ProtectedRoute />}>
          <Route path='/discover' element={<Discover />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/' element={<ProtectedRoute requirement={false} />}>
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
        <Route path='/recipe/:id' element={<Recipe />} />
        <Route path='/search' element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
