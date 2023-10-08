import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../contexts/AuthContext'
import { CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Space, message } from 'antd'
import { firestore } from '../../../config/firebase'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { Navigate, useNavigate } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import logo1 from '../../../assets/logo/student.png'
import logo2 from '../../../assets/logo/reward.png'
import logo3 from '../../../assets/logo/office.png'
import logo4 from '../../../assets/logo/money.png'
import sidePicture from '../../../assets/logo/growth.jpg'
import { LogoutOutlined } from '@ant-design/icons'

export default function Hero() {

  const { user } = useAuthContext()
  const [documents, setDocuments] = useState([])
  const [allDocuments, setAllDocuments] = useState([])
  const [isSearch, setIsSearch] = useState([])


  const navigate = useNavigate()

  const handleSearchChange = (e) => {
    setIsSearch(e.target.value)
  }

  const getData = async () => {
    try {
      const q = query(collection(firestore, "uploadProduct"), where("make", "==", "profile"))
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


  const data = [
    { name: "G1", value: 200 },
    { name: "G2", value: 400 },
    { name: "G3", value: 100 },
    { name: "G4", value: 700 },
    { name: "G5", value: 400 },
    { name: "G6", value: 500 },
    { name: "G7", value: 300 },
    { name: "G8", value: 100 },
    { name: documents.length, value: 200 },

  ]






  const handleDelete = async (todo) => {

    try {
      await deleteDoc(doc(firestore, "uploadProduct", todo.id));

      let documentsAfterDelete = documents.filter(doc => doc.id !== todo.id)
      setAllDocuments(documentsAfterDelete)
      setDocuments(documentsAfterDelete)

      message.success("Todo deleted successfully")
    } catch (err) {
      console.error(err)
      message.error("something went wrong while delting todo")
    }

  }

  
  const filteredItems = documents.filter((document) => {
    return document.name.toLocaleLowerCase().indexOf(isSearch) !==
      -1
  }
  );


  return (

    <>



      <div className="container mt-3 ms-3">
        <div className="row gap-3" style={{ cursor: "pointer" }}>
          <div className="col-4 d-flex p-5 " style={{ fontSize: "23px", borderRadius: "10px", width: "240px", backgroundColor: "#ffc3a0" }}>
            <div>
              Students
              <br />
              40067
            </div>
            <div>
              <img src={logo1} style={{ height: "50px", width: "50px" }} alt="" />
            </div>
          </div>

          <div className="col-4 d-flex p-5 " style={{ fontSize: "23px", borderRadius: "10px", width: "240px", backgroundColor: "#ffc3a0" }}>
            <div>
              Reward
              <br />
              70+
            </div>
            <div>
              <img src={logo2} style={{ height: "50px", width: "50px" }} alt="" />
            </div>
          </div>

          <div className="col-4 d-flex p-5 " style={{ fontSize: "23px", borderRadius: "10px", width: "240px", backgroundColor: "#ffc3a0" }}>
            <div>
              Department
              <br />
              40067
            </div>
            <div>
              <img src={logo3} style={{ height: "50px", width: "50px" }} alt="" />
            </div>
          </div>

          <div className="col-4 d-flex p-5 " style={{ fontSize: "23px", borderRadius: "10px", width: "240px", backgroundColor: "#ffc3a0" }}>
            <div>
              Revenue
              <br />
              $750
            </div>
            <div>
              <img src={logo4} style={{ height: "50px", width: "50px" }} alt="" />
            </div>
          </div>
          <div className="col-12 d-flex" style={{ fontSize: "23px", position: "absolute", right: "10px", borderRadius: "10px", width: "240px", backgroundColor: "#fff" }}>

            
          </div>



        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <LineChart
              width={900}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </div>
        </div>
      </div>

      <div className="container mt-5 ms-5">
        <div className="row">
          <div className="col">
            <h1>Students</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12" style={{ marginLeft: "400px" }}>
            <input type="search" name="search" id="search" placeholder='Search-Bar' onChange={handleSearchChange} style={{ width: "300px", padding: "12px", border: "1px solid black", borderRadius: "25px" }} />
          </div>
        </div>
      </div>

      <div className="container ms-5 mt-3" style={{ width: "950px", height: "500px", position: "absolute" }} >
        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-striped table-hover" style={{ cursor: "pointer" }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>CNIC</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((todo, i) => {
                    return (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{<img src={todo.photo?.url} alt={todo.fullName} className='img-fluid rounded' style={{ height: "50px", width: "40px", cursor: "pointer" }} />}</td>
                        <td>{todo.name}</td>
                        <td>{todo.phone}</td>
                        <td>{todo.cnic}</td>
                        <td>{todo.description}</td>
                        < td >
                          <button className='btn btn-success rounded-0' onClick={() => { navigate(`../editProduct/${todo.id}`) }}><EditOutlined /></button>
                          <button className='btn btn-danger ms-2 rounded-0' onClick={() => { handleDelete(todo) }}><DeleteOutlined /></button>
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



    </>
  )
}
