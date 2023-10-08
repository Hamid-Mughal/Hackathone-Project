import React, { useState } from 'react'
import '../../App.scss'
import { Button, Divider, Form, Input, Typography, message } from 'antd'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'

const { Title } = Typography

export default function Login() {

  const navigate = useNavigate()

  const { readUserProfile } = useAuthContext()
  const [state, setState] = useState({ email: "", password: "" })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleLogin = e => {
    e.preventDefault()

    let { email, password } = state

    setIsProcessing(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        readUserProfile(user)
        navigate('/')
        message.success("User Login Successfully")
        setIsProcessing(false)
      })
      .catch(err => {
        message.error("Something went wrong while signing user")
        console.error(err)
        setIsProcessing(false)
      })
      
  }
    return (
        <>

            <div className="container mt-5 boxShadow" style={{ backgroundColor: "white", height: "620px", width: "700px" }}>
                <div className="row">
                    <div className="col">
                        <h1 className='text-center mt-5'>Login</h1>
                        <p className='mt-4 text-center'>Enter Forgot-Password details to get access</p>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col px-5 py-3">
                        <label className='fw-bold mb-3'>Username Or Email Address</label><br />
                        <input type="text" className='form-control w-100 border-1' placeholder='Username / Email Address' name='email' onChange={handleChange} style={{ borderRadius: "0px", height: "50px" }} />
                    </div>
                </div>
                <div className="row">
                    <div className="col px-5 py-3">
                        <label className='fw-bold mb-3'>Password</label><br />
                        <input type="password" className='form-control w-100 border-1' placeholder='Enter Password' name='password' onChange={handleChange} style={{ borderRadius: "0px", height: "50px" }} />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-9 px-5">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" style={{ width: "23px", height: "23px", borderRadius: "6px" }} />
                            <label class="form-check-label" for="flexCheckDefault">
                                <p className='ms-2 d-flex align-items-center' style={{ fontSize: "18px" }}>Keep Me Logged In</p>
                            </label>
                        </div>
                    </div>


                    {/* <div className="col-3">
                        <Link to="/auth/loginAccounts" id='forgot' style={{ fontSize: "18px",textDecoration:"none", cursor: "pointer", }}>Login With Accounts</Link>
                    </div> */}
                </div>


                <div className="row mt-5">
                    <div className="col-9 px-5 d-flex align-items-center">
                        <p>Don’t have an account? <Link to='/auth/signUp' style={{color:"red", textDecoration:"none"}}>Sign Up</Link> here</p>
                    </div>


                    <div className="col-3">
                        <button className='btn btn-danger' style={{borderRadius:"0px",height:"60px",width:"110px"}} loading={isProcessing} onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>

        </>
    )
}
