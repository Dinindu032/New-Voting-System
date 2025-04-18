import { signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { FiLock, FiMail } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '../components'
import { auth } from '../config'
import { useAlertContext } from '../providers'
import { useAuth } from '../providers/AuthProvider'

export const Login = () => {
  const alert = useAlertContext()

  const navigate = useNavigate()
  // const { user } = useAuth()
const authContext = useAuth();
const user = authContext?.user;


  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (user) {
      alert.show('Already logged in')
      navigate('/')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((curr) => ({ ...curr, [e.target.name]: e.target.value }))

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password,
      )
      if (user) {
        alert.show('Successfuly logged in', 'success')
        navigate('/')
      } else {
        alert.show('Invalid credentials', 'error')
        setInputs((curr) => ({ ...curr, password: '' }))
      }
    } catch (error) {
      alert.show('Invalid credentials', 'error')
      setInputs((curr) => ({ ...curr, password: '' }))
    }
  }

  return (
    <div className="content full-page flex items-center justify-center">
      <div
        className="flex flex-col gap-4 rounded-lg border bg-white p-6"
        style={{ width: '400px' }}
      >
        <div className="-mb-2 text-center text-lg font-semibold">LOGIN</div>
        <div className="mb-4 text-center text-sm text-neutral-500">
          You need to login to access the admin panel
        </div>
        <Input
          icon={FiMail}
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
          name="email"
        />
        <Input
          icon={FiLock}
          placeholder="Password"
          type="password"
          value={inputs.password}
          onChange={handleChange}
          name="password"
        />
        <Button label="Login" onClick={handleLogin} />
      </div>
    </div>
  )
}
