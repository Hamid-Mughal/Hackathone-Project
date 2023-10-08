import React, { useState } from 'react'
import '../../App.scss'
import { Button, Divider, Form, Input, Typography, message } from 'antd'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { firestore } from '../../config/firebase'
import dayjs from 'dayjs'
import { ArrowRightOutlined } from '@ant-design/icons'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

const { Title } = Typography
const initialState = { name: "", phone: "", cnic: "", courses: "", status: "", description: "" }

export default function UploadProduct() {

    const { user } = useAuthContext()

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const [file, setFile] = useState({})
    const [isFileUpload, setIsFileUpload] = useState(false)
    const [progress, setProgress] = useState(0)

    const todayDate = dayjs().format("YYYY-MM-DD");
    const todayTime= dayjs().format("HH-mm-ss");

    const navigate = useNavigate()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleUploadProduct = async (e) => {
        e.preventDefault()
        let { name, phone, cnic, courses, status, description } = state

        if (!name) { return message.error("Please enter title") }

        const todo = {
            name, phone, cnic, courses, status, description,
            // dateCreated:  new Date().getTime(),
            dateCreated: serverTimestamp(),
            today: todayDate,
            todayTime: todayTime,
            make: "profile",
            createdBy: {
                fullName: user.fullName,
                email: user.email,
                uid: user.uid,
            },
            id: Math.random().toString(36).slice(2)
        }


        setIsProcessing(true)
        if (file.name) {
            uploadFile(todo)
            createDocuments(todo)
            message.success("Your Product With Picture Upload Successfully")
        } else {
            createDocuments(todo)
            message.success("Your Product Document Upload Successfully")
        }

    }

    const uploadFile = (todo) => {

        const storage = getStorage();

        const fileName = todo.id + "-" + file.name

        console.log("Picture upload successfully")

        const storageRef = ref(storage, `images/${fileName}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        setIsFileUpload(true)
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress)
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.error("error adding photo upload")
                setIsProcessing(false)
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);

                    const data = { ...todo, photo: { name: file.name, url: downloadURL } }

                    createDocuments(data)
                });
            }
        );

    }

    const createDocuments = async (todo) => {
        console.log("Document Upload")
        try {
            await setDoc(doc(firestore, "uploadProduct", todo.id), todo);
            // message.success("A new product added successfully")
            setState(initialState)
            // navigate('/')
        } catch (e) {
            console.error("Error adding product: ", e);
            message.error("Error in adding product")
        }
        setIsFileUpload(false)
        setIsProcessing(false)
    }


    return (
        <>
            <div className="container mt-5 mb-5 boxShadow" style={{ backgroundColor: "white", height: "860px", width: "950px" }}>
                <div className="row">
                    <div className="col">
                        <h1 className='text-center mt-5'>Upload Profile</h1>
                        <p className='mt-4 text-center'>Enter upload product details to get access</p>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6 px-5 py-3">
                        <label className='fw-bold mb-3'>Student Name</label><br />
                        <input type="text" className='form-control w-100 border-1' placeholder='Name' name='name' onChange={handleChange} style={{ borderRadius: "0px", height: "50px" }} />
                    </div>

                    <div className="col-6 px-5 py-3">
                        <label className='fw-bold mb-3'>Picture</label><br />
                        <input type="file" className='form-control' onChange={(e) => { setFile(e.target.files[0]) }} />
                        {isFileUpload &&
                            <div className='progress mt-2' role='progressbar' aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                                <div className='progress-bar' style={{ width: progress + "%" }}>{progress}%</div>
                            </div>
                        }
                    </div>

                    <div className="col-6 px-5 py-3">
                        <label className='fw-bold mb-3'>Phone Number</label><br />
                        <input type="number" className='form-control w-100 border-1' placeholder='Number' name='phone' onChange={handleChange} style={{ borderRadius: "0px", height: "50px" }} />
                    </div>

                    <div className="col-6 px-5 py-3">
                        <label className='fw-bold mb-3'>CNIC Number</label><br />
                        <input type="number" className='form-control w-100 border-1' placeholder='CNIC' name='cnic' onChange={handleChange} style={{ borderRadius: "0px", height: "50px" }} />
                    </div>

                    <div className="col-6 px-5 py-3">
                        <label className='fw-bold mb-3'>Choose Courses</label><br />
                        <select className="form-select" onChange={handleChange} name='courses' >
                            <option selected disabled hidden>Choose Quality</option>
                            <option style={{ fontWeight: "bolder" }}>Computer Science</option>
                            <option style={{ fontWeight: "bolder" }}>Arts</option>
                            <option style={{ fontWeight: "bolder" }}>Engineering</option>
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
                    </div>


                    <div className="col-3">
                        <button className='btn btn-danger' style={{ borderRadius: "0px", height: "60px", width: "110px" }} onClick={handleUploadProduct} loading={isProcessing}>Upload</button>
                    </div>
                </div>
            </div>
        </>
    )
}
