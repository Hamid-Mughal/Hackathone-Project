import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'
export default function Index() {
  return (
    <Routes>
        <Route path='login' element={<Login />} />
        <Route path='signUp' element={<SignUp />} />
    </Routes>
  )
}
