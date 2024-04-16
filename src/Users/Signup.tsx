import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import * as client from './client'

export default function Signup() {
  const [error, setError] = useState('')
  const [user, setUser] = useState({ username: '', password: '' })
  const navigate = useNavigate()

  const signup = async () => {
    try {
      await client.signup(user)
      alert('Successful signup')
      navigate('/Kanbas/Account/Profile')
    } catch (err: any) {
      setError(err.response.data.message)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
      <div className="d-flex flex-column" style={{ width: '250px' }}>
        <h1>Signup</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <label htmlFor="username" className="form-label">Username</label>
        <input
          id="username"
          type="text"
          value={user.username}
          className="mb-2 form-control"
          onChange={e =>
            setUser({
              ...user,
              username: e.target.value,
            })
          }
        />
        <label htmlFor="password" className="form-label">Password</label>
        <input
          id="password"
          type="password"
          value={user.password}
          className="mb-2 form-control"
          onChange={e =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
        />
        <button className="btn btn-primary mb-2" onClick={signup}>
          Signup
        </button>
        <Link to="/Kanbas/Account/Signin">Already have an account</Link>
      </div>
    </div>
  )
}
