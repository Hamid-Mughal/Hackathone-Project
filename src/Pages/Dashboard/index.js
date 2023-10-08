import React from 'react'
import {Routes , Route} from 'react-router-dom'
import UploadStudent from './UploadStudent'
import UploadCourses from './UploadCourses'

export default function Index() {
  return (
    <>
    
    <Routes>
        <Route path='/uploadStudent' element={<UploadStudent />} />
        <Route path='/uploadCourses' element={<UploadCourses />} />
    </Routes>
    
    </>
  )
}
