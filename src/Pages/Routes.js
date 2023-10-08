import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import { useAuthContext } from '../contexts/AuthContext'
import PrivateRoute from '../contexts/PrivateRoute'
import Dashboard from './Dashboard'
import EditCourse1 from './Frontend/Courses/EditCourse1'
import EditProduct from './Frontend/Students/EditProduct'


export default function Index() {
    const { isAuth } = useAuthContext()
    return (
        <>

            <Routes>
                <Route path='editProduct/:id' element={<EditProduct />} />
                <Route path='editCourse1/:id' element={<EditCourse1 />} />
                <Route path='/*' element={<PrivateRoute Component={Frontend} />} />
                <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to="/" />} />
                <Route path='/dashboard/*' element={<Dashboard />} />
            </Routes>

        </>
    )
}
