import { useState, useEffect, useCallback } from 'react'
import { Navigate, Route, Routes, useParams, useLocation } from 'react-router-dom'
import { HiMiniBars3 } from 'react-icons/hi2'
import CourseNavigation from './Navigation'
import Modules from './Modules'
import Home from './Home'
import Assignments from './Assignments'
import AssignmentEditor from './Assignments/Editor'
import Quizzes from './Quizzes'
import QuizDetail from './Quizzes/Detail'
import QuizaDetailEditor from './Quizzes/DetailEditor'
import QuestionContent from './Quizzes/QuestionsEditor/QuestionsContent'
import Grades from './Grades'
import { FaGlasses } from 'react-icons/fa'
import axios from 'axios'

const API_BASE = process.env.REACT_APP_BASE_API_URL
export default function Courses({ courses }: { courses: any[] }) {
  const [isExtraSmScreen, setIsExtraSmScreen] = useState(window.innerWidth < 576)
  useEffect(() => {
    const handleResize = () => {
      setIsMdScreen(window.innerWidth >= 768 && window.innerWidth < 992)
      setIsSmScreen(window.innerWidth < 768)
      setIsExtraSmScreen(window.innerWidth < 576) // 更新isExtraSmScreen状态
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { courseId } = useParams()
  const COURSES_API = `${API_BASE}/api/courses`
  // console.log(COURSES_API)
  const [course, setCourse] = useState<any>({ _id: '' })

  console.log(course)
  const findCourseById = useCallback(
    async (courseId?: string) => {
      const response = await axios.get(`${COURSES_API}/${courseId}/modules`)
      setCourse(response.data)
    },
    [COURSES_API]
  ) // Add any dependencies that are required for this function here

  useEffect(() => {
    findCourseById(courseId)
  }, [courseId, findCourseById])

  const location = useLocation()

  const [showNavigation, setShowNavigation] = useState(true)
  const [isMdScreen, setIsMdScreen] = useState(window.innerWidth >= 768 && window.innerWidth < 992)
  const [isSmScreen, setIsSmScreen] = useState(window.innerWidth < 768)
  // 处理点击事件的函数，用于切换导航的显示状态
  const toggleNavigation = () => setShowNavigation(!showNavigation)

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMdScreen(window.innerWidth >= 768 && window.innerWidth < 992)
      setIsSmScreen(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Update navigation visibility based on screen size
  useEffect(() => {
    if (isMdScreen || isSmScreen) {
      setShowNavigation(false)
    } else {
      setShowNavigation(true)
    }
  }, [isMdScreen, isSmScreen])
  // Adjust content style based on navigation visibility and extra small screen size
  const contentStyle = {
    left: isExtraSmScreen ? '0px' : showNavigation ? '250px' : '90px',
    top: '65px',
  }
  const headerStyle = {
    marginLeft: isExtraSmScreen ? '0px' : '80px',
  }

  // 解析当前路径来获取相应的标题
  const getPageTitle = (pathname: string) => {
    const pathParts = pathname.split('/').filter(Boolean)
    const currentPage = pathParts[pathParts.length - 1]

    switch (currentPage) {
      case 'Home':
        return 'Home'
      case 'Modules':
        return 'Modules'
      case 'Assignments':
        return 'Assignments'
      case 'Quizzes':
        return 'Quizzes'
      case 'Grades':
        return 'Grades'
      case 'Piazza':
        return 'Piazza'
      case 'ZoomMeetings':
        return 'Zoom Meetings'
      case 'People':
        return 'People'
      case 'PanoptoVideo':
        return 'Panopto Video'
      case 'Discussions':
        return 'Discussions'
      case 'Announcements':
        return 'Announcements'
      case 'Pages':
        return 'Pages'
      case 'Files':
        return 'Files'
      case 'Rubrics':
        return 'Rubrics'
      case 'Outcomes':
        return 'Outcomes'
      case 'Collaborations':
        return 'Collaborations'
      case 'Syllabus':
        return 'Syllabus'
      case 'Settings':
        return 'Settings'
      default:
        return ''
    }
  }

  const pageTitle = getPageTitle(location.pathname)
  useEffect(() => {
    findCourseById(courseId)
  }, [courseId, findCourseById])
  return (
    <div className="kanbas-course" style={headerStyle}>
      <div
        className={`d-flex align-items-center justify-content-between p-2 border-1 border-gray border-bottom ${isMdScreen || isSmScreen ? 'bg-dark text-white' : ''}`}
        style={{ fontSize: isMdScreen || isSmScreen ? '15px' : '30px' }}
      >
        <div className="d-flex align-items-center">
          <button className="btn btn-light text-danger" onClick={toggleNavigation}>
            <HiMiniBars3 />
          </button>
          <h1
            className={`ms-2 text-danger ${isMdScreen || isSmScreen ? 'text-center' : ''}`}
            style={{ fontSize: isMdScreen || isSmScreen ? '15px' : '30px' }}
          >
            {courseId}.{courses.find(course => course.id === courseId)?.name}
            <span
              style={{
                color: isMdScreen || isSmScreen ? 'white' : 'black',
                fontSize: isMdScreen || isSmScreen ? '15px' : '25px',
              }}
            >
              {pageTitle && ` > ${pageTitle}`}
            </span>
          </h1>
        </div>
        <div>
          <button
            className={`btn btn-light border-1 ${isMdScreen || isSmScreen ? 'border-white' : 'border-black'}`}
          >
            <FaGlasses />
            {/* Conditionally render the button text based on screen size */}
            {!isMdScreen && !isSmScreen && <span>&nbsp;Student View</span>}
          </button>
        </div>
      </div>
      {showNavigation && <CourseNavigation />}
      <div className="overflow-y-scroll position-fixed bottom-0 end-0" style={contentStyle}>
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
          <Route path="Home" element={<Home />} />
          <Route path="Modules" element={<Modules />} />
          <Route path="Piazza" element={<h1>Piazza</h1>} />
          <Route path="ZoomMeetings" element={<h1>Zoom Meetings</h1>} />
          <Route path="Assignments" element={<Assignments />} />
          <Route path="Assignments/:assignmentId" element={<AssignmentEditor />} />
          <Route path="Quizzes/*" element={<Quizzes />} />
          <Route path="Quizzes/:quizId/QuizDetail" element={<QuizDetail />} />
          <Route path="Quizzes/:quizId/DetailEditor" element={<QuizaDetailEditor />} />
          <Route path="Quizzes/:quizId/QuestionEditor/:questionId" element={<QuestionContent />} />
          <Route path="Grades" element={<Grades />} />
          <Route path="People" element={<h1>People</h1>} />
          <Route path="PanoptoVideo" element={<h1>Panopto Video</h1>} />
          <Route path="Discussions" element={<h1>Discussions</h1>} />
          <Route path="Announcements" element={<h1>Announcements</h1>} />
          <Route path="Pages" element={<h1>Pages</h1>} />
          <Route path="Files" element={<h1>Files</h1>} />
          <Route path="Rubrics" element={<h1>Rubrics</h1>} />
          <Route path="Outcomes" element={<h1>Outcomes</h1>} />
          <Route path="Collaborations" element={<h1>Collaborations</h1>} />
          <Route path="Syllabus" element={<h1>Syllabus</h1>} />
          <Route path="Settings" element={<h1>Settings</h1>} />
        </Routes>
      </div>
    </div>
  )
}
