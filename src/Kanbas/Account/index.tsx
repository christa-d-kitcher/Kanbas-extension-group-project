import { Routes, Route, Navigate } from 'react-router-dom'
import Signin from '../../Users/Signin'
import Signup from '../../Users/Signup'
import Profile from '../../Users/Profile'
import UserTable from '../../Users/Table'

export default function Account() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Admin/Users" element={<UserTable />} />
      </Routes>
    </div>
  )
}
