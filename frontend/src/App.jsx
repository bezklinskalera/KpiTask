import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import {RegisterPage} from './pages/registerPage'
import {EnterPage} from './pages/enterPage'
import {CoursesTeacherPage} from './pages/coursesTeacher'
import '../src/styles/reset.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/enter" element={<EnterPage />} />
      <Route path="/coursesTeacher" element={<CoursesTeacherPage />} />
    </Routes>
    </>
  )
}

export default App
