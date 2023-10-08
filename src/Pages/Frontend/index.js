import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Students from './Students'
import Attendance from './Attendance'
import Courses from './Courses'
import Art from './Art'
import CS from './CS'
import Law from './Law'
import SideBar from '../../Components/SideBar'
import Inactive from './Attendance/Inactive'

export default function Index() {
    return (
        <>
            <SideBar />
            <div className='col-10 offset-2'>
                <Routes>
                    <Route path='/' element={<Students />} />
                    <Route path='/courses' element={<Courses />} />
                    <Route path='/inActive' element={<Inactive />} />
                    <Route path='/attendance' element={<Attendance />} />
                    <Route path='/arts' element={<Art />} />
                    <Route path='/cs' element={<CS />} />
                    <Route path='/law' element={<Law />} />
                </Routes>

            </div>
        </>
    )
}
