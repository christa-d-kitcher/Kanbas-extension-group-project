import React, { useState, useEffect, useCallback } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import KanbasNavigation from './Navigation'
import Account from './Account'
import Courses from './Courses'
import Dashboard from './Dashboard'
import { findAllCourses, createCourse, deleteCourse, updateCourse } from './client' // Ensure these are correctly defined and imported
import { Course } from './client' // Importing the Course interface

function Kanbas() {
  const [courses, setCourses] = useState<Course[]>([]) // Explicit type annotation for courses state
  const [course, setCourse] = useState<Course>({
    _id: '',
    id: '',
    name: 'New Course',
    number: 'New Number',
    startDate: '2023-09-10',
    endDate: '2023-12-15',
    department: 'D123', // Added required field
    credits: 4, // Added required field
    image: 'course.jpg',
  })

  const loadCourses = useCallback(async () => {
    const allCourses = await findAllCourses()
    setCourses(allCourses)
  }, [])

  const handleAddNewCourse = async () => {
    try {
      const newCourse = await createCourse(course)
      setCourses(prevCourses => [...prevCourses, newCourse])
      alert(`${course.name} Course Creation Success`)
    } catch (error) {
      console.error('Failed to add the course:', error)
    }
  }

  const handleDeleteCourse = async (courseId: string) => {
    // Added type for courseId
    try {
      await deleteCourse(course._id) // Pass the courseId instead of the course object
      setCourses(prevCourses => prevCourses.filter(course => course._id !== courseId))
    } catch (error) {
      console.error('Failed to delete the course:', error)
    }
  }

  const handleUpdateCourse = async () => {
    try {
      const updatedCourse = await updateCourse(course);
      setCourses(prevCourses => prevCourses.map(c => (c._id === course._id ? updatedCourse : c)));
    } catch (error) {
      console.error('Failed to update the course:', error);
    }
  };  

  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  return (
    <Provider store={store}>
      <div className="d-flex" style={{ height: '100vh' }}>
        <KanbasNavigation />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={handleAddNewCourse}
                  deleteCourse={handleDeleteCourse}
                  updateCourse={handleUpdateCourse}
                />
              }
            />
            <Route path="/Courses/:courseId/*" element={<Courses courses={courses} />} />
          </Routes>
        </div>
      </div>
    </Provider>
  )
}

export default Kanbas
