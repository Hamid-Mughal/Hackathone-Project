import React, { useEffect, useState } from 'react'
import { Select, Space, message } from 'antd'
import { firestore } from '../../../config/firebase'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import './graph'
import { LogoutOutlined } from '@ant-design/icons'
import { useAuthContext } from '../../../contexts/AuthContext'

export default function Hero() {

  const { user } = useAuthContext()
  const [isSearch, setIsSearch] = useState([])
  // const [status, SetStatus] = useState("active")
  const [documents, setDocuments] = useState([])
  const [allDocuments, setAllDocuments] = useState([])

  const navigate = useNavigate()

  const getData = async () => {
    try {
      const q = query(collection(firestore, "uploadProduct"), where("status", "==", "Absent"))
      const querySnapshot = await getDocs(q);
      const array = []
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        array.push(data)
      });
      setDocuments(array)
      setAllDocuments(array)
    } catch (error) {
      console.log(error)
      message.error("please connect to Internet")
      return () => getData()
    }
  }
  useEffect(() => {
    getData()
  }, [getData])



  const filteredItems = documents.filter((document) => {
    return document.name.toLocaleLowerCase().indexOf(isSearch) !==
      -1
  }
  );

  const handleSearchChange = (e) => {
    setIsSearch(e.target.value)
  }



  // useEffect(() => {
  //   const filteredDocuments = allDocuments.filter(todo => todo.status === status)
  //   setAllDocuments(filteredDocuments)
  // }, [allDocuments, status])

  return (
    <>
      
      <div className="container mt-5 ms-5" style={{overflowX:"hidden"}}>
        <div className="row">
          <div className="col">
            <h1>Attendance</h1>
          </div>
          {/* <div className="col-12" style={{ marginLeft: "400px" }}>
            <input type="search" name="search" id="search" placeholder='Search-Bar' onChange={handleSearchChange} style={{ width: "300px", padding: "12px", border: "1px solid black", borderRadius: "25px" }} />
          </div> */}
        </div>
      </div>

      
      <div className="container mt-4">
        <div className="row">
          <div className="col d-flex justify-content-center">
            <Link to='/attendance' className='btn btn-light' style={{fontSize:"23px"}}>Go To Check Active</Link>
          </div>
        </div>
      </div>


      <div className="container">
        <div className="row">
          <div className="col">
            <h3 className='text-center my-4 mt-5'>In-Active Students ({documents.length})</h3>
          </div>
        </div>
      </div>

     

      <div className="container ms-5 mt-3" style={{ height: "500px",width:"1100px", position: "absolute" }} >
      {/* 
        <Select placeholder="Select status" onChange={status => SetStatus(status)}>
          {["active", "inactive"].map((status, i) => {
            return <Select.Option key={i} value={status}>{status}</Select.Option>
          })}
        </Select> */}

      <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-striped table-hover" style={{ cursor: "pointer" }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>CNIC</th>
                    <th>Attendance</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((todo, i) => {
                    return (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{todo.name}</td>
                        <td>{todo.cnic}</td>
                        <td>{todo.status}</td>
                        < td >
                          <button className='btn btn-success rounded-0' onClick={() => { navigate(`../editProduct/${todo.id}`) }}><EditOutlined /></button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div >


      {/* <div className="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h1>Make Google charts responsive</h1>
            <p>Full blog post details <a href="http://flopreynat.com/blog/make-google-charts-responsive.html">on my blog</a></p>
          </div>
          <div class="col-md-4 col-md-offset-4">
            <hr />
          </div>
          <div class="clearfix"></div>
          <div class="col-md-6">
            <div id="chart_div1" class="chart"></div>
          </div>
          <div class="col-md-6">
            <div id="chart_div2" class="chart"></div>
          </div>
        </div>
      </div> */}
    </>
  )
}
