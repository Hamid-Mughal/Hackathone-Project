import React, { useState } from 'react'
import '../../App.scss'
import { Button, Divider, Form, Input, Typography, message } from 'antd'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { firestore } from '../../config/firebase'
import dayjs from 'dayjs'
import { ArrowRightOutlined } from '@ant-design/icons'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

const { Title } = Typography
const initialState = { name: "", cnic: "", courses: "", status: "", description: "" }

export default function UploadProduct() {

    const { user } = useAuthContext()

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)

    const todayDate = dayjs().format("YYYY-MM-DD");
    const todayTime = dayjs().format("HH-mm-ss");

    const navigate = useNavigate()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleUploadProduct = async (e) => {
        e.preventDefault()
        let { name, cnic, courses, status, description } = state

        if (!name) { return message.error("Please enter title") }

        const todo = {
            name, cnic, courses, status, description,
            // dateCreated:  new Date().getTime(),
            dateCreated: serverTimestamp(),
            today: todayDate,
            todayTime: todayTime,
            make: "courses",
            id: Math.random().toString(36).slice(2)
        }


        setIsProcessing(true)

        try {
            await setDoc(doc(firestore, "uploadCourses", todo.id), todo);
            message.success("A new couses added successfully")
            setState(initialState)
            navigate('/courses')
        } catch (e) {
            console.error("Error adding product: ", e);
            message.error("Error in adding product")
        }
        setIsProcessing(false)


    }
    


    return (
        <>
            <div className="container mt-5 mb-5 boxShadow" style={{ backgroundColor: "white", height: "860px", width: "950px" }}>
                <div className="row">
                    <div className="col">
                        <h1 className='text-center mt-5'>Upload Courses</h1>
                        <p className='mt-4 text-center'>Enter upload product details to get access</p>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6 px-5 py-3">
                        <label className='fw-bold mb-3'>Student Name</label><br />
                        <input type="text" className='form-control w-100 border-1' placeholder='Name' name='name' onChange={handleChange} style={{ borderRadius: "0px", height: "50px" }} />
                    </div>

                    <div className="col-6 px-5 py-3">
                        <label className='fw-bold mb-3'>CNIC Number</label><br />
                        <input type="number" className='form-control w-100 border-1' placeholder='CNIC' name='cnic' onChange={handleChange} style={{ borderRadius: "0px", height: "50px" }} />
                    </div>

                    <div className="col-6 px-5 py-3">
                        <label className='fw-bold mb-3'>Choose Courses</label><br />
                        <select className="form-select" onChange={handleChange} name='courses' >
                            <option selected disabled hidden>Choose Quality</option>
                            <option style={{ fontWeight: "bolder" }}>Arts</option>
                            <option style={{ fontWeight: "bolder" }}>Medical</option>
                            <option style={{ fontWeight: "bolder" }}>Law</option>

                        </select>
                    </div>

                    <div className="col-6 px-5 py-3">
                        <label className='fw-bold mb-3'>Choose Status</label><br />
                        <select className="form-select" onChange={handleChange} name='status' >
                            <option selected disabled hidden>Choose Status</option>
                            <option style={{ fontWeight: "bolder" }}>Hide</option>
                            <option style={{ fontWeight: "bolder" }}>Show</option>
                        </select>
                    </div>

                    <div className="col-12 px-5 py-3">
                        <label className='fw-bold mb-3'>Description</label><br />
                        <Input.TextArea placeholder='Input your description' name='description' onChange={handleChange} />
                    </div>



                </div>


                <div className="row mt-5">
                    <div className="col-9 px-5 d-flex align-items-center">
                        <p>Go to Shopping <Link to='/' className='me-4' style={{ color: "black", marginLeft: "3px" }}><ArrowRightOutlined /></Link></p>
                    </div>


                    <div className="col-3">
                        <button className='btn btn-danger' style={{ borderRadius: "0px", height: "60px", width: "110px" }} onClick={handleUploadProduct} loading={isProcessing}>Upload</button>
                    </div>
                </div>
            </div>
        </>
    )
}
