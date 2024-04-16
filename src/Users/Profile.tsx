import * as client from './client'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Profile() {
  const [profile, setProfile] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    role: 'USER',
  })
  const navigate = useNavigate()

  const fetchProfile = async () => {
    const account = await client.profile()
    setProfile(account)
  }

  const save = async () => {
    await client.updateUser(profile)
    alert('Successful update')
    // fetchProfile()
    navigate('/Kanbas/Account/SignIn')
  }
  const signout = async () => {
    await client.signout()
    navigate('/Kanbas/Account/Signin')
  }
  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
        <div className="d-flex flex-column" style={{ width: '250px' }}>
          <div className="d-flex justify-content-between mb-1">
            <h1>Profile</h1>
          </div>
          <Link to="/Kanbas/Account/Admin/Users" className="btn btn-warning w-100 mb-2">
            Users
          </Link>
          {profile && (
            <div>
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                value={profile.username}
                className="mb-2 form-control"
                onChange={e => setProfile({ ...profile, username: e.target.value })}
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={profile.password}
                className="mb-2 form-control"
                onChange={e => setProfile({ ...profile, password: e.target.value })}
              />
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                id="firstName"
                value={profile.firstName}
                className="mb-2 form-control"
                onChange={e => setProfile({ ...profile, firstName: e.target.value })}
              />
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                id="lastName"
                value={profile.lastName}
                className="mb-2 form-control"
                onChange={e => setProfile({ ...profile, lastName: e.target.value })}
              />
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                value={profile.dob}
                className="mb-2 form-control"
                onChange={e => setProfile({ ...profile, dob: e.target.value })}
              />
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                value={profile.email}
                className="mb-2 form-control"
                onChange={e => setProfile({ ...profile, email: e.target.value })}
              />
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                id="role"
                className="form-control mb-2"
                value={profile.role}
                onChange={e => setProfile({ ...profile, role: e.target.value })}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
              <button className="btn btn-primary w-100 mb-2" onClick={save}>
                Save
              </button>
              <button className="btn btn-danger w-100" onClick={signout}>
                Signout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
