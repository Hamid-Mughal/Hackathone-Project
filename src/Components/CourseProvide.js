import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { signOut } from 'firebase/auth'
import { firestore } from '../config/firebase'
// import { message } from 'antd'
// import dayjs from 'dayjs'
// import {HomeOutlined} from '@ant-design/icons'
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
// import { Modal, message } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { message } from 'antd'

export default function CourseProvide() {

  const [allDocuments, setAllDocuments] = useState([])
  const [documents, setDocuments] = useState([])
  const [todo, setTodo] = useState({})

  // const { isAuth, dispatch } = useAuthContext()

  console.log("allDocuments", allDocuments)
  console.log("setTodo", setTodo)

  const todayDate = dayjs(todo.date).format("YYYY-MM-DD");
  console.log("today Date", todayDate)



  const specialTodos = async () => {
    const colRef = collection(firestore, "uploadCourses")
    const q = query(colRef, where("make", "==", "courses"))


    onSnapshot(q, (snapshot) => {
      let stickynotes = []
      snapshot.docs.forEach((doc) => {
        stickynotes.push({ ...doc.data(), id: doc.id })
      })
      setAllDocuments(stickynotes)
      setDocuments(stickynotes)
      console.log(stickynotes)
    })

  }
  console.log(specialTodos)


  useEffect(() => {
    specialTodos()
  }, [specialTodos])


  const handleDelete = async (todo) => {

    try {
      await deleteDoc(doc(firestore, "uploadCourses", todo.id));

      let documentsAfterDelete = documents.filter(doc => doc.id !== todo.id)
      setAllDocuments(documentsAfterDelete)
      setDocuments(documentsAfterDelete)

      message.success("Todo deleted successfully")
    } catch (err) {
      console.error(err)
      message.error("something went wrong while delting todo")
    }

  }




  return (
    <>
      <div className="container">

        <div className="container">
          <div className="row">
            <div className="col gap-3 d-flex">
              <Link to='/courses' className='p-4 border-2 fw-bold bottomLine' style={{ textDecoration: "none", fontSize: "30px" }}>All Courses</Link>
              <Link to='/arts' className='p-4 border-2 fw-bold bottomLine' style={{ textDecoration: "none", fontSize: "30px" }}>Arts</Link>
              <Link to='/cs' className='p-4 border-2 fw-bold bottomLine' style={{ textDecoration: "none", fontSize: "30px" }}>Medical</Link>
              <Link to='/law' className='p-4 border-2 fw-bold bottomLine' style={{ textDecoration: "none", fontSize: "30px" }}>Law</Link>
            </div>
          </div>
        </div>



        <div className="row row-cols-1 row-cols-md-3" data-aos="fade-up">
          {documents.map((todo, i) => {
            return (
              <div className="col" key={i}>
                <div className="card mt-4" style={{ backgroundColor: document.backgroundColor }}>
                  <div className="card boxShadow " style={{ height: '260px', backgroundColor: "#edf6f9" }}>
                    <div style={{ height: '100%', padding: "9px" }}>
                      <h1 className="card-title text-center">{todo.courses || "Title"}</h1>
                      <h4 className="card-text d-flex align-items-center"><h3>Date : </h3>{todo.today || "Description"}</h4>
                      <h4 className="card-text d-flex align-items-center"><h3>Time : </h3>{todo.todayTime || "Description"}</h4>
                      <h4 className="card-text d-flex align-items-center"><h3>Description : </h3>{todo.description || "Description"}</h4>
                      <div >
                        <button className='btn btn-success px-4 py-2'>Edit</button>
                        <button className='btn btn-danger px-4 py-2 ms-2'>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
          }
        </div>
      </div>

    </>
  )
}
