import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from './client'
import * as client from './client'

export default function Signin() {
  const [credentials, setCredentials] = useState<User>({
    _id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'USER',
  })

  const navigate = useNavigate()

  const signin = async () => {
    await client.signin(credentials)
    console.log('credentials', credentials)
    navigate('/Kanbas/Account/Profile')
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
      <div className="d-flex flex-column" style={{ width: '250px' }}>
        <h1 className="mb-2">Signin</h1>
        <label htmlFor="username" className="form-label">Username</label>
        <input
          id="username"
          className="mb-2 form-control"
          value={credentials.username}
          onChange={e => setCredentials({ ...credentials, username: e.target.value })}
        />
        <label htmlFor="password" className="form-label">Password</label>
        <input
          id="password"
          className="mb-2 form-control"
          type="password"
          value={credentials.password}
          onChange={e => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button className="btn btn-primary mb-2" onClick={signin}>
          Signin
        </button>
        <Link to="/Kanbas/Account/Signup">
          Create an Account
        </Link>
      </div>
    </div>
  )
}
