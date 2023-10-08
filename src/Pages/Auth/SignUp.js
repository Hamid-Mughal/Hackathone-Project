import React, { useState } from 'react'
import { Button, DatePicker, Divider, Form, Input, Typography, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from '../../config/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

const { Title } = Typography

export default function SignUp() {

  const navigate = useNavigate()

  const { dispatch } = useAuthContext()
  const [state, setState] = useState({ fullName: "", email: "", password: "", confirmPassword: "" ,picture: "" })
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSignUp = () => {

    let { fullName, email, password, confirmPassword } = state

    console.log("fullName", fullName)

    if (password !== confirmPassword) {
      message.error("Please enter confirm password correctly.")
    }

    setIsProcessing(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        message.success("A new user has been created successfully")
        navigate('/auth/login')
        createUserProfile(user)
      })
      .catch(err => {
        message.error("Something went wrong while creating user")
        // console.error(err)
      })
      .finally(() => {
        // setIsFileUpload(true)
        setIsProcessing(false)
      })
  }


  const createUserProfile = async (user) => {
    let { fullName, password, confirmPassword } = state
    const { email, uid } = user

    const userData = {
      fullName, email, password, confirmPassword,
      uid: uid,
      category: "user",
      dateCreated: serverTimestamp(),
      roles: ["user"]
    }

    try {
      await setDoc(doc(firestore, "signUp", uid), userData);
      //   message.success("A new user has been created successfully")
      dispatch({ type: "SET_LOGGED_IN", payload: { user: userData } })
    } catch (e) {
      //   message.error("Something went wrong while creating user profile")
      //   console.error("Error adding document: ", e);
    }
  }


  return (
    <>

      <div className="container mt-5 mb-5 boxShadow" style={{ backgroundColor: "white", height: "780px", width: "700px" }}>
        <div className="row">
          <div className="col">
            <h1 className='text-center mt-5'>Sign Up</h1>
            <p className='mt-4 text-center'>Create your account to get full access</p>
          </div>
        </div>

        <div className="row mt-1">
          <div className="col px-5 py-3">
            <label className='fw-bold mb-3'>Full Name</label><br />
            <input type="text" className='form-control w-100 border-1' name='fullName' onChange={handleChange} placeholder='Enter full name' style={{ borderRadius: "0px", height: "50px" }} />
          </div>
        </div>
        {/* <div className="row mt-1">
          <div className="col px-5 py-3">
            <label className='fw-bold mb-3'>Upload Picture</label><br />
            <input type="file" name='picture' className='form-control' onChange={handleChange} />
          </div>
        </div> */}
        <div className="row">
          <div className="col px-5 py-2">
            <label className='fw-bold mb-3'>Email Address</label><br />
            <input type="text" className='form-control w-100 border-1' name='email' onChange={handleChange} placeholder='Enter email address' style={{ borderRadius: "0px", height: "50px" }} />
          </div>
        </div>
        <div className="row">
          <div className="col px-5 py-2">
            <label className='fw-bold mb-3'>Password</label><br />
            <input type="password" className='form-control w-100 border-1' name='password' onChange={handleChange} placeholder='Enter Password' style={{ borderRadius: "0px", height: "50px" }} />
          </div>
        </div>
        <div className="row">
          <div className="col px-5 py-2">
            <label className='fw-bold mb-3'>Confirm Password</label><br />
            <input type="password" className='form-control w-100 border-1' name='confirmPassword' onChange={handleChange} placeholder='Confirm Password' style={{ borderRadius: "0px", height: "50px" }} />
          </div>
        </div>



        <div className="row mt-5">
          <div className="col-9 px-5 d-flex align-items-center">
            <p>Don’t have an account? <Link to='/auth/login' style={{ color: "red", textDecoration: "none" }}>Login</Link> here</p>
          </div>


          <div className="col-3">
            <button className='btn btn-danger' style={{ borderRadius: "0px", height: "60px", width: "110px" }} loading={isProcessing} onClick={handleSignUp}>Sign Up</button>
          </div>
        </div>
      </div>

    </>
  )
}
